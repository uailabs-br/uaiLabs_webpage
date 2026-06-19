"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NebulaProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  opacity?: number;
}

export default function Nebula({
  position,
  color,
  scale = 60,
  opacity = 0.4,
}: NebulaProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uTime: { value: 0 },
        uOpacity: { value: opacity },
        uSeed: { value: Math.random() * 100 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uOpacity;
        uniform float uSeed;
        varying vec2 vUv;

        vec2 hash(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return fract(sin(p) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(dot(hash(i + vec2(0,0)) - 0.5, f - vec2(0,0)),
                dot(hash(i + vec2(1,0)) - 0.5, f - vec2(1,0)), u.x),
            mix(dot(hash(i + vec2(0,1)) - 0.5, f - vec2(0,1)),
                dot(hash(i + vec2(1,1)) - 0.5, f - vec2(1,1)), u.x), u.y) + 0.5;
        }
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 p = vUv * 3.0 + uSeed;
          float t = uTime * 0.03;
          float cloud = fbm(p + vec2(t, -t * 0.5));
          cloud *= fbm(p * 1.7 - vec2(t * 0.3, t));

          // radial falloff so edges fade into space
          float d = length(vUv - 0.5);
          float falloff = smoothstep(0.5, 0.05, d);

          float density = pow(cloud, 1.8) * falloff;
          gl_FragColor = vec4(uColor, density * uOpacity);
        }
      `,
    });
  }, [color, opacity]);

  useFrame(({ clock, camera }) => {
    mat.uniforms.uTime.value = clock.elapsedTime;
    ref.current.rotation.z += 0.00008;

    // Fade out as camera gets close to the nebula's Z coordinate
    const distZ = position[2] - camera.position.z;
    if (distZ >= 0) {
      mat.uniforms.uOpacity.value = 0;
    } else {
      const absDist = Math.abs(distZ);
      const fadeStart = 100;
      const fadeEnd = 25;
      if (absDist < fadeStart) {
        if (absDist <= fadeEnd) {
          mat.uniforms.uOpacity.value = 0;
        } else {
          const t = (absDist - fadeEnd) / (fadeStart - fadeEnd);
          const smoothT = t * t * (3 - 2 * t);
          mat.uniforms.uOpacity.value = opacity * smoothT;
        }
      } else {
        mat.uniforms.uOpacity.value = opacity;
      }
    }
  });

  return (
    <mesh ref={ref} position={position} material={mat}>
      <planeGeometry args={[scale, scale]} />
    </mesh>
  );
}
