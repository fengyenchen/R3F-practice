'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls, Environment } from '@react-three/drei';

function Model({ color, alpha }: { color: string; alpha: string }) {
  // 不變的骨架
  const frame = useLoader(GLTFLoader, '/screen_frame.glb');
  // 切換顏色
  const colorModel = useLoader(GLTFLoader, `/screen_${color}.glb`);
  // 切換透明度
  const alphaModel = useLoader(GLTFLoader, `/screen_alpha_${alpha}.glb`);

  return (
    <>
      <primitive object={frame.scene} />
      <primitive object={colorModel.scene} />
      <primitive object={alphaModel.scene} />
    </>
  );
}

// 燈光組件
function Lights() {
  return (
    <>
      {/* 環境光 */}
      <ambientLight intensity={0.8} />

      {/* 平行光與點光源 */}
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFFFFF" castShadow />
      <directionalLight position={[-5, 5, -2]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[0, 4, 6]} intensity={2.0} color="#FFFFFF" />
      <pointLight position={[0, 3, 2]} intensity={3} color="#FFFFFF" />

      {/* 環境反射 */}
      <Environment preset="city" background={false} environmentIntensity={0.4} />
    </>
  );
}

// 接收父元件傳下來的狀態
export default function Screen({ color, alpha }: { color: string; alpha: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas
        camera={{
          position: isMobile ? [-3, 4, -10] : [-4, 6, -6],
          fov: isMobile ? 55 : 45,
        }}
        gl={{
          alpha: true,
          antialias: true
        }}
      >
        <Lights />

        {/* 當狀態改變時，Suspense 會在載入新模型時自動處理 */}
        <Suspense fallback={null}>
          <Model color={color} alpha={alpha} />
        </Suspense>

        <OrbitControls
          makeDefault // 設定為預設控制器
          enableDamping={true}  // 阻尼效果
          dampingFactor={0.05} // 阻尼系數
          enableZoom={true} // 縮放
          enablePan={true} // 平移
          panSpeed={1.0} // 平移速度
          zoomSpeed={1.0} // 縮放速度
          enableRotate={true} // 旋轉

          // 目的地/焦點位置
          target={[0, 2.5, 0]} // 相機旋轉與縮放的中心點
        />
      </Canvas>
    </div>
  );
}