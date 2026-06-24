'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls, Environment } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

// 將模型獨立成子元件
function Model() {
  const gltf = useLoader(GLTFLoader, '/crownCork.glb');
  
  const modelRef = useRef<any>(null);
  // 每一幀自動計算位置，達成上下左右漂浮
  useFrame((state) => {
    if (!modelRef.current) return;

    const elapsedTime = state.clock.getElapsedTime();

    // 上下漂浮 (y 軸)
    modelRef.current.position.y = Math.sin(elapsedTime * 1.0) * 0.04;
    // 左右漂浮 (x 軸)
    modelRef.current.position.x = Math.cos(elapsedTime * 0.8) * 0.02;
  })

  return <primitive ref={modelRef} object={gltf.scene} />;
}

// 燈光組件
function Lights() {
  return (
    <>
      {/* 1. 環境光 */}
      <ambientLight intensity={0.01} />

      {/* 2. 平行光 */}
      <directionalLight position={[1, 3, 1]} intensity={2} color="#FFFFFF" castShadow />
      <directionalLight position={[3.8, 1.5, -1]} intensity={4} color="#FFFFFF" castShadow />
      <directionalLight position={[0, 1.5, 1]} intensity={1} color="#FFFFFF" castShadow />
      <directionalLight position={[-2, 0.5, -3]} intensity={4} color="#FFFFFF" castShadow />
      <pointLight position={[-1, 0, 2]} intensity={6} color="#FFFFFF" />

      {/* 3. 環境反射 */}
      <Environment preset="city" background={false} backgroundBlurriness={5} environmentIntensity={0.05} />
    </>
  );
}

export default function CrownCork() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 建立一個狀態來決定目前是否為手機板（預設為 false 避免 SSR 報錯）
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 元件掛載時先執行一次
    handleResize();

    // 監聽視窗大小改變
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#151220] pointer-events-none">
      <Canvas
        style={{ width: '100vw', height: '100vh' }}

        // 根據 isMobile 三元運算子動態切換相機位置與視野角度
        camera={{
          position: isMobile ? [2, 8, 5] : [1.2, 4.6, 2.6],
          fov: isMobile ? 65 : 45,
        }}
        gl={{
          antialias: true
        }}
      >
        {/* 載入燈光 */}
        <Lights />

        {/* 將 Suspense 包裹剛剛建立的 Model 元件 */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* 控制器 */}
        <OrbitControls
          makeDefault // 設定為預設控制器
          enableDamping={true}  // 阻尼效果
          dampingFactor={0.05} // 阻尼系數
          rotateSpeed={0.8} // 旋轉速度
          enableZoom={false} // 縮放
          minDistance={1} // 最小縮放距離
          maxDistance={5} // 最大縮放距離
          enablePan={false} // 平移
          panSpeed={1.0} // 平移速度
          zoomSpeed={1.0} // 縮放速度
          minPolarAngle={0} // 垂直旋轉最小角度
          maxPolarAngle={Math.PI / 1.8} // 垂直旋轉最大角度
          minAzimuthAngle={-Infinity} // 水平旋轉最小角度
          maxAzimuthAngle={Infinity}  // 水平旋轉最大角度
          enableRotate={false} // 旋轉
          autoRotate={true} // 自動旋轉
          autoRotateSpeed={0.05} // 自動旋轉速度

          mouseButtons={{
            LEFT: 0,
            MIDDLE: 0,
            RIGHT: 0,
          }}
          touches={{
            ONE: 0,
            TWO: 0,
          }}

          // 目的地/焦點位置
          target={[0, 0, 0]} // 相機旋轉與縮放的中心點
        />

        {/* 後製效果 */}
        <EffectComposer>
          {/* 亮度閾值、亮度平滑度、效果高度 */}
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>

      </Canvas>

    </div>
  );
}