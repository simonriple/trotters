import * as THREE from "three";
import { Suspense, useMemo, useState } from "react";
import { Canvas, useThree, useFrame, context } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CameraControls from "camera-controls";
import { CityContext, CityProvider, useCity } from "../state/CityContext";
import { BridgeCityProvider } from "../state/BridgeContext";
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
      
      pos.set(focus.x, focus.y, focus.z);
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
  const city = useCity();
  return (
    <CityContext.Consumer>
      {(value) => (
        <Canvas camera={{ position: [0, 0, 15] }}>
          <CityContext.Provider value={value}>
            <ambientLight />
            <directionalLight position={[150, 150, 150]} intensity={0.55} />
            <Suspense fallback={null}>
              <Earth
                setFocus={setFocus}
                citySelected={pointSelected}
                setCitySelected={setPointSelected}
                city={city}
              />
            </Suspense>
            <Controls focus={focus} pointSelected={pointSelected} />
          </CityContext.Provider>
        </Canvas>
      )}
    </CityContext.Consumer>
  );
};
