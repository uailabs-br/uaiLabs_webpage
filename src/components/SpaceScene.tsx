"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import StarField from "./StarField";
import Planet from "./Planet";
import Nebula from "./Nebula";

const TOTAL_DEPTH = 500;

interface SpaceSceneProps {
  scrollProgress: React.RefObject<number>;
  mobile?: boolean;
}

export default function SpaceScene({ scrollProgress, mobile = false }: SpaceSceneProps) {
  const smoothZ = useRef(0);

  useFrame(({ camera }) => {
    const target = (scrollProgress.current ?? 0) * TOTAL_DEPTH;
    smoothZ.current = THREE.MathUtils.lerp(smoothZ.current, target, 0.04);
    camera.position.z = -smoothZ.current;
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight
        position={[0.7, 0.45, 0.55]}
        intensity={1.8}
        color="#fff4e6"
      />

      <StarField count={mobile ? 850 : 2200} />

      <Planet
        position={[35, 10, -90]}
        radius={14}
        texture="/textures/planets/mars.jpg"
        atmosphere="#ffb27a"
        roughness={0.95}
        tilt={0.3}
        spin={0.0018}
      />
      <Planet
        position={[-45, -16, -210]}
        radius={15.84}
        texture="/textures/planets/jupiter.jpg"
        atmosphere="#f0d9a8"
        roughness={0.8}
        tilt={-0.2}
        spin={0.0012}
        rings={{ color1: "#d4b896", color2: "#8a6e4a" }}
      />
      {!mobile && (
        <Planet
          position={[58, 26, -360]}
          radius={6.3}
          texture="/textures/planets/haumea.jpg"
          atmosphere="#eaf0ff"
          roughness={0.6}
          tilt={0.4}
          spin={0.001}
        />
      )}
      <Planet
        position={[-15, -5, -450]}
        radius={14}
        texture="/textures/planets/venus.jpg"
        atmosphere="#ffd9a0"
        roughness={0.85}
        tilt={0.15}
        spin={0.0009}
      />

      <Nebula
        position={[10, 0, -150]}
        color="#4a6fff"
        scale={mobile ? 120 : 160}
        opacity={mobile ? 0.5 : 0.43}
      />
      <Nebula
        position={[-20, -10, -270]}
        color="#b070ff"
        scale={mobile ? 130 : 190}
        opacity={mobile ? 0.55 : 0.48}
      />
      <Nebula
        position={[-80, 30, -190]}
        color="#b070ff"
        scale={mobile ? 100 : 130}
        opacity={mobile ? 0.35 : 0.29}
      />
      <Nebula
        position={[30, 15, -360]}
        color="#4a6fff"
        scale={mobile ? 110 : 150}
        opacity={mobile ? 0.4 : 0.36}
      />
      <Nebula
        position={[-100, 8, -440]}
        color="#b070ff"
        scale={mobile ? 120 : 170}
        opacity={mobile ? 0.4 : 0.35}
      />
      <Nebula
        position={[-50, -15, -560]}
        color="#8a5cf5"
        scale={mobile ? 130 : 180}
        opacity={mobile ? 0.65 : 0.70}
      />
      {!mobile && (
        <>
          <Nebula
            position={[55, -20, -330]}
            color="#7a8cff"
            scale={120}
            opacity={0.26}
          />
          <Nebula
            position={[5, -25, -500]}
            color="#4a6fff"
            scale={200}
            opacity={0.31}
          />
          <Nebula
            position={[45, 20, -600]}
            color="#6a4fff"
            scale={160}
            opacity={0.60}
          />
        </>
      )}

    </>
  );
}
