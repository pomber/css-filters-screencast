import React from "react";

export function PointLight({ x, y, z, color }) {
  return (
    <div
      style={{
        padding: 8,
        overflow: "hidden",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          border: "4px solid black",
          padding: "20px 7px",
          filter: "url(#my-filter-id)",
          fontFamily: "initial",
          margin: 0,
        }}
      >
        Lorem ipsum dolor sit amet
      </h1>
      <svg height="0" width="0">
        <filter id="my-filter-id" primitiveUnits="objectBoundingBox">
          <feDiffuseLighting
            surfaceScale="50"
            in="SourceGraphic"
            lightingColor={color}
          >
            <fePointLight x={x} y={y} z={z} />
          </feDiffuseLighting>
        </filter>
      </svg>
    </div>
  );
}
