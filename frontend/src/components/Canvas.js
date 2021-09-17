import * as THREE from "three";
import { Suspense, useMemo, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CameraControls from "camera-controls";

import { Earth } from "./Earth";

CameraControls.install({ THREE });

const Controls = ({
  focus,
  pointSelected,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) => {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
  controls.dollySpeed = 0.1;
  return useFrame((state, delta) => {
    if (pointSelected) {
      pos.set(focus.x + 0.2, focus.y + 0.2, focus.z + 0.2);
      //look.set(focus.x, focus.y, focus.z - 0.2);

      state.camera.position.lerp(pos, 0.5);
      state.camera.updateProjectionMatrix();

      controls.setLookAt(
        state.camera.position.x,
        state.camera.position.y,
        state.camera.position.z,
        look.x,
        look.y,
        look.z,
        true
      );
    }
    return controls.update(delta);
  });
};

export const CanvasContainer = () => {
  const [focus, setFocus] = useState(null);
  const [pointSelected, setPointSelected] = useState(false);
  return (
    <Canvas camera={{ position: [0, 0, 15]}}>
      <ambientLight />
      <directionalLight position={[150, 150, 150]} intensity={0.55} />
      <Suspense fallback={null}>
        <Earth
          setFocus={setFocus}
          citySelected={pointSelected}
          setCitySelected={setPointSelected}
        />
      </Suspense>
      <Controls focus={focus} pointSelected={pointSelected} />
    </Canvas>
  );
};
