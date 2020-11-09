import React from "react";
import { PointLight } from "./point-light";

const steps = [
  { id: 1 },
  { id: 2, overlay: Overlay },
  {
    id: 3,
    browserChildren: <PointLight x={0.5} y={0.5} z={0.5} color="#FDB813" />,
  },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  {
    id: 7,
    browserChildren: <PointLight x={0.5} y={0.5} z={0.5} color="#FDB813" />,
  },
];

export const browserSteps = steps.map(({ id, browserChildren }) => ({
  loadUrl: `/${id}.html`,
  children: browserChildren,
}));

export const codeSteps = steps.map(({ id, focus }) => ({
  code: require(`!!raw-loader!../public/${id}.html`).default,
  focus,
}));

export const overlaySteps = steps.map(
  ({ overlay }) => overlay || React.Fragment
);

function Overlay({ children }) {
  return <div style={{ outline: "5px solid red" }}>{children}</div>;
}
