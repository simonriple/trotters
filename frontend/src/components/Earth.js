import EarthMap from "../assets/8k_earth_daymap.jpg";
import { useLoader } from "@react-three/fiber";

import { TextureLoader, Vector3 } from "three";
import { useState } from "react";

const cities = [
  {
    name: "Bergen",
    pos: new Vector3(4.873921377386726, 8.721230622269651, -0.4712243608268356),
  },
  {
    name: "Tokyo",
    pos: new Vector3(-6.234902729914097, 5.798982742124402, -5.241383247100139),
  },
  {
    name: "Roma",
    pos: new Vector3(7.2706360940325485, 6.674890283998632, -1.6030125367885),
  },
];
const margin = 0.1;
const closeEnough = (a, b) => {
  //console.log(a + " > " + (b - margin) + " && " + a + " < " + (b + margin));
  return a > b - margin && a < b + margin;
};
const posOk = (posA, posB) => {
  //console.log("checking pos ", posA, posB);
  return (
    closeEnough(posA.x, posB.x) &&
    closeEnough(posA.y, posB.y) &&
    closeEnough(posA.z, posB.z)
  );
};

const pointIsInCity = (pos) => {
  return cities.some((city) => posOk(pos, city.pos));
};

export const Earth = (props) => {
  const { setFocus, citySelected, setCitySelected } = props;
  const [map] = useLoader(TextureLoader, [EarthMap]);
  return (
    <>
      <mesh
        position={[0, 0, 0]}
        onClick={(e) => {
          console.log(e.point);
          if (!citySelected && pointIsInCity(e.point)) {
            console.log("in city");
            setCitySelected(true);
            setFocus(e.point);
          } else {
            setCitySelected(false);
            setFocus(null);
            console.log("not in city");
          }
        }}
      >
        <sphereGeometry args={[10.005, 64, 64]} />
        <meshStandardMaterial map={map} metalness={0.4} roughness={0.7} />
      </mesh>
      <Cities />
    </>
  );
};

const Cities = () => {
  return cities.map((city) => (
    <mesh position={city.pos}>
      <sphereGeometry args={[margin, 32, 32]} />
      <meshPhongMaterial
        opacity={0.4}
        depthWrite={true}
        transparent={true}
        color={"red"}
      />
    </mesh>
  ));
};
