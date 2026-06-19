"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Shared geometries reused across every planet
const bodyGeo = new THREE.SphereGeometry(1, 64, 48);

// Sun direction (world) shared with the scene's directional light
const SUN_DIR = new THREE.Vector3(0.7, 0.45, 0.55).normalize();

// Radial ring strip (color + alpha along its width) reused by ringed planets
const RING_TEXTURE = "/textures/planets/saturn_ring_alpha.png";

const ringGeo = new THREE.RingGeometry(1.2, 2.4, 128, 1);
// Remap UVs so u goes radially from inner to outer edge
const pos = ringGeo.attributes.position;
const uv = ringGeo.attributes.uv;
for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i);
  const y = pos.getY(i);
  const r = Math.sqrt(x * x + y * y);
  uv.setXY(i, (r - 1.2) / (2.4 - 1.2), 0.5);
}

const ringVertexShader = `
  varying vec2 vUv;
  varying vec3 vWPos;
  varying vec3 vWNormal;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWPos = wp.xyz;
    vWNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const ringFragmentShader = `
  uniform vec3 uLightDir;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uPlanetPos;
  uniform float uPlanetRadius;
  uniform sampler2D uRingTex;
  uniform vec3 uTint;
  varying vec2 vUv;
  varying vec3 vWPos;
  varying vec3 vWNormal;

  void main() {
    float r = vUv.x; // 0 = inner edge, 1 = outer edge

    // --- Ring texture (radial strip with alpha) ---
    vec4 tex = texture2D(uRingTex, vec2(r, 0.5));
    float density = tex.a;
    vec3 color = tex.rgb * uTint;

    // --- Lighting ---
    float NdotL = dot(vec3(0.0, 1.0, 0.0), uLightDir);
    float lit = 0.35 + 0.65 * max(abs(NdotL), 0.0);

    // --- Planet shadow on rings ---
    // Project ring point onto light ray, check if it passes through planet sphere
    vec3 toLight = uLightDir;
    vec3 ringToPlanet = uPlanetPos - vWPos;
    float proj = dot(ringToPlanet, toLight);
    vec3 closest = vWPos + toLight * proj - uPlanetPos;
    float distFromAxis = length(closest);
    float shadow = smoothstep(uPlanetRadius * 0.85, uPlanetRadius * 1.1, distFromAxis);
    shadow = mix(0.15, 1.0, shadow);
    // Only shadow when ring is behind planet relative to light
    shadow = proj > 0.0 ? shadow : 1.0;

    gl_FragColor = vec4(color * lit * shadow, density);
  }
`;

interface RingsConfig {
  color1?: string;
  color2?: string;
}

interface PlanetProps {
  position: [number, number, number];
  radius?: number;
  texture: string;
  atmosphere: string;
  roughness?: number;
  tilt?: number;
  spin?: number;
  rings?: RingsConfig;
}

export default function Planet({
  position,
  radius = 8,
  texture,
  atmosphere,
  roughness = 0.9,
  tilt = 0.25,
  spin = 0.0015,
  rings,
}: PlanetProps) {
  const bodyRef = useRef<THREE.Mesh>(null!);

  const map = useTexture(texture);
  useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    map.wrapS = THREE.RepeatWrapping;
  }, [map]);

  const ringTex = useTexture(RING_TEXTURE);
  useMemo(() => {
    ringTex.colorSpace = THREE.SRGBColorSpace;
    ringTex.wrapS = THREE.ClampToEdgeWrapping;
    ringTex.wrapT = THREE.ClampToEdgeWrapping;
    ringTex.anisotropy = 4;
  }, [ringTex]);

  const bodyMat = useMemo(
    () => {
      const m = new THREE.MeshStandardMaterial({
        map,
        roughness,
        metalness: 0.0,
      });
      m.onBeforeCompile = (shader) => {
        shader.uniforms.uAtmo = { value: new THREE.Color(atmosphere) };
        shader.uniforms.uLightDir = { value: SUN_DIR };
        shader.vertexShader = shader.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
             varying vec3 vWNormal;
             varying vec3 vWView;`
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
             vWNormal = normalize(mat3(modelMatrix) * normal);
             vec3 wpos = (modelMatrix * vec4(transformed, 1.0)).xyz;
             vWView = normalize(cameraPosition - wpos);`
          );
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
             uniform vec3 uAtmo;
             uniform vec3 uLightDir;
             varying vec3 vWNormal;
             varying vec3 vWView;`
          )
          .replace(
            "#include <dithering_fragment>",
            `#include <dithering_fragment>
             // Broad soft atmospheric band near the limb (exp 2.2 = wider than
             // a thin rim), plus a tighter brighter edge stacked on top.
             float grazing = 1.0 - max(dot(vWView, vWNormal), 0.0);
             float rim = pow(grazing, 2.0) * 0.72 + pow(grazing, 5.0) * 1.12;
             float litRim = smoothstep(-0.1, 0.6, dot(vWNormal, uLightDir));
             gl_FragColor.rgb += uAtmo * rim * litRim;`
          );
      };
      return m;
    },
    [map, roughness, atmosphere]
  );

  const ringMat = useMemo(() => {
    if (!rings) return null;
    return new THREE.ShaderMaterial({
      vertexShader: ringVertexShader,
      fragmentShader: ringFragmentShader,
      uniforms: {
        uLightDir: { value: SUN_DIR },
        uRingTex: { value: ringTex },
        uTint: { value: new THREE.Color(rings.color1 ?? "#ffffff") },
        uPlanetPos: { value: new THREE.Vector3(...position) },
        uPlanetRadius: { value: radius },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [rings, position, radius, ringTex]);

  useFrame(() => {
    bodyRef.current.rotation.y += spin;
  });

  return (
    <group position={position} rotation={[0, 0, tilt]}>
      <mesh ref={bodyRef} geometry={bodyGeo} material={bodyMat} scale={radius} />
      {rings && ringMat && (
        <mesh
          geometry={ringGeo}
          material={ringMat}
          rotation={[Math.PI / 2, 0, 0]}
          scale={radius}
        />
      )}
    </group>
  );
}
