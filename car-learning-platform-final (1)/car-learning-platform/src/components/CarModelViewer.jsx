// CarModelViewer.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

function Model({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
}

export default function CarModelViewer({ modelUrl }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <OrbitControls makeDefault />
        <Bounds fit clip observe margin={1}>
          <Model modelUrl={modelUrl} />
        </Bounds>
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
