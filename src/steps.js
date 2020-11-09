import React from "react";
import { PointLight } from "./point-light";

const steps = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7, code: "7.1", focus: "12:26" },
  {
    id: 7,
    code: "7.1",
    focus: "12:26",
    overlay: Overlay,
    browserChildren: <Demo />,
  },
];

export const browserSteps = steps.map(({ id, browserChildren }) => ({
  loadUrl: `/${id}.html`,
  children: browserChildren,
}));

export const codeSteps = steps.map(({ code, id, focus }) => ({
  code: require(`!!raw-loader!../public/${code || id}.html`).default,
  focus,
}));

export const overlaySteps = steps.map(
  ({ overlay }) => overlay || React.Fragment
);

const X = 0.1;
const Y = 0.2;
const Z = 0.15;

const ParamsContext = React.createContext({
  x: X * 2,
  y: Y * 2,
  z: Z,
  color: "#fdb813",
});

function Overlay({ children }) {
  const [x, setX] = React.useState(X);
  const [y, setY] = React.useState(Y);
  const [z, setZ] = React.useState(Z);
  const [color, setColor] = React.useState("#fdb813");
  return (
    <div style={{ position: "relative" }}>
      <ParamsContext.Provider value={{ x: x * 2, y: y * 2, z, color }}>
        {children}
      </ParamsContext.Provider>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 19.75,
          color: "rgb(206, 145, 120)",
        }}
      >
        <div style={{ position: "absolute", top: "363px", left: "232px" }}>
          <span style={{ marginRight: 15, background: "#1e1e1e" }}>
            {x.toFixed(2)}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={x}
            onChange={(e) => setX(+e.target.value)}
          />
        </div>
        <div style={{ position: "absolute", top: "386px", left: "232px" }}>
          <span style={{ marginRight: 15, background: "#1e1e1e" }}>
            {y.toFixed(2)}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={y}
            onChange={(e) => setY(+e.target.value)}
          />
        </div>
        <div style={{ position: "absolute", top: "410px", left: "232px" }}>
          <span style={{ marginRight: 15, background: "#1e1e1e" }}>
            {z.toFixed(2)}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={z}
            onChange={(e) => setZ(+e.target.value)}
          />
        </div>
        <div style={{ position: "absolute", top: "289px", left: "362.7px" }}>
          <span style={{ marginRight: 15, background: "#1e1e1e" }}>
            {color}
          </span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function Demo() {
  const props = React.useContext(ParamsContext);
  return <PointLight {...props} />;
}
