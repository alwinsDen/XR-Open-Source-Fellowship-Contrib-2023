import React from "react";
import "../index.scss";
import MtumxLogo from "../../assets/pngs/mxlogo-2.png";
import {useNavigate} from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className={"bannerDiv"}>
      <img
        src={MtumxLogo}
        style={{
          width: "35px",
        }}
        alt={"mtumxMain"}
        onClick={()=>{
          navigate("/")
        }}
      />
    </div>
  );
};

export const actionMenuData = [
  "Enable Ready-player Me Download",
  "Enable Virtual -Try on",
  "Enable QR code",
  "Hide Fullscreen Button",
  "AR Filter",
  "Virtual Measurements",
];

export const presetsMenuData = [
  "All presets",
  "Sleeve",
  "Gowns",
  "Necklines",
  "Collars",
];

export const mediaDataJson = {
  fov: { value: 50, type: "def", name: "Field of view" },
  // intHor: { value: 0, type: "def", name: "Initial horizontal angle" },
  horRan: {
    value: [10, 340],
    type: "mul",
    name: "Horizontal range",
  },
  // initVangle: { value: 0, type: "def", name: "Initial vertical angle" },
  vertAngle: { value: [0, 180], type: "mul", name: "Vertical range" },
  rotSpeed: { value: 10, type: "def", name: "Rotation speed" },
  rotInert: { value: 0, type: "def", name: "Rotation Inertia" },
  autoRotSpeed: { value: 0, type: "def", name: "Auto rotation speed" },
  // initZoom: { value: 0, type: "def", name: "Initial zoom" },
  zoomSpeed: { value: 1, type: "def", name: "Zoom speed" },
  zoomRange: { value: [0, 30], type: "mul", name: "Zoom range" },
};

export const SettingsDataJson = [
  {
    name: "Upload Unit",
    options: ["Meters", "Millimeters", "Centimeters"],
    default: 1,
  },
  {
    name: "Projection Mode",
    options: ["Perspective", "Orthographic"],
    default: 0,
  },
  {
    name: "Quality Present",
    options: ["Performance", "Quality"],
    default: 1,
  },
];
export default Banner;
