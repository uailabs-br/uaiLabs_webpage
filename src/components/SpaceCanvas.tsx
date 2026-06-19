"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import SpaceScene from "./SpaceScene";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export default function SpaceCanvas() {
  const reducedMotion = useReducedMotion();
  const mobile = useMobile();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-surface-2 via-bg to-bg" />
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={mobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 0], fov: 72, near: 1, far: 1500 }}
        frameloop="always"
      >
        <color attach="background" args={["#000000"]} />
        {/* Cosmic haze — distant bodies dissolve into a deep indigo fog */}
        <fogExp2 attach="fog" args={["#0a0a22", 0.0018]} />
        <Suspense fallback={null}>
          <SpaceScene scrollProgress={scrollProgress} mobile={mobile} />
        </Suspense>
        {mobile ? (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.3}
              luminanceThreshold={0.75}
              luminanceSmoothing={0.2}
              mipmapBlur
              radius={0.35}
            />
          </EffectComposer>
        ) : (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.84}
              luminanceSmoothing={0.2}
              mipmapBlur
              radius={0.5}
            />
            <Vignette eskil={false} offset={0.2} darkness={0.7} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
