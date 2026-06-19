"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DEPTH = 600;
const SPREAD = 300;

// Mostly white, a few faint blue-whites. No saturated colors.
const PALETTE = [
  new THREE.Color("#ffffff"),
  new THREE.Color("#ffffff"),
  new THREE.Color("#f0f4ff"),
  new THREE.Color("#e8eeff"),
  new THREE.Color("#cdd8f5"),
];

interface StarFieldProps {
  count?: number;
}

export default function StarField({ count = 4000 }: StarFieldProps) {
  const ref = useRef<THREE.Points>(null!);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const twinkleSpeed = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * SPREAD;
      positions[i3 + 1] = (Math.random() - 0.5) * SPREAD;
      positions[i3 + 2] = -Math.random() * DEPTH;

      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Fine points: mostly tiny, very few slightly larger (still small)
      const r = Math.random();
      sizes[i] = r > 0.98 ? 1.8 + Math.random() * 0.8 : 0.5 + Math.random() * 1.0;

      phases[i] = Math.random() * Math.PI * 2;
      twinkleSpeed[i] = 0.5 + Math.random() * 1.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute(
      "aTwinkleSpeed",
      new THREE.BufferAttribute(twinkleSpeed, 1)
    );

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: {
          value: typeof window !== "undefined" ? window.devicePixelRatio : 1,
        },
      },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aPhase;
        attribute float aTwinkleSpeed;
        uniform float uTime;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          vColor = aColor;
          vTwinkle = 0.7 + 0.3 * sin(uTime * aTwinkleSpeed + aPhase);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          // radial glow: bright center fading smoothly to zero, no hard edge
          float d = length(gl_PointCoord - vec2(0.5)) * 2.0; // 0 at center, 1 at edge
          float glow = pow(max(1.0 - d, 0.0), 2.2);
          float core = pow(max(1.0 - d * 1.7, 0.0), 4.0); // tight bright nucleus
          float alpha = (glow * 0.65 + core) * vTwinkle;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });

    return { geometry, material };
  }, [count]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.z += 0.00003;
    }
  });

  return (
    <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />
  );
}
