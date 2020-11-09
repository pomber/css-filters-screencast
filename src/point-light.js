import React from "react";

export function PointLight({ x, y, z, color }) {
  return (
    <div style={{ margin: 8 }}>
      <h1
        style={{
          border: "4px solid black",
          padding: 7,
          filter: "url(#my-filter-id)",
          fontFamily: "initial",
          margin: 0,
        }}
      >
        Lorem ipsum dolor sit amet
      </h1>
      <svg height="0" width="0">
        <filter
          id="my-filter-id"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          primitiveUnits="objectBoundingBox"
        >
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
