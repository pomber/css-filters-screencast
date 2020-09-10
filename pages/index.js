import React from "react";
import { MiniBrowser } from "@code-hike/mini-browser";
import { MiniEditor } from "@code-hike/mini-editor";
import { useSpring } from "use-spring";

export default function Page() {
  const [step, setStep] = React.useState(0);
  const [progress] = useSpring(step, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
  });
  return (
    <div
      style={{
        height: "90vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style jsx global>{`
        .ch-frame .ch-editor-body code {
          font-size: 25px;
          line-height: 1.2em;
        }
      `}</style>
      <main
        style={{
          width: 1024,
          height: 576,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
          gridColumnGap: "16px",
          gridRowGap: "16px",
        }}
      >
        <MiniEditor
          style={{ gridArea: "1 / 1 / 6 / 4" }}
          steps={codeSteps}
          lang="html"
          progress={progress}
        />
        <MiniBrowser
          steps={browserSteps}
          prependOrigin
          url="/hello-world"
          style={{ gridArea: " 1 / 4 / 4 / 6" }}
          zoom={1.6}
          progress={progress}
        />
        <div
          style={{
            gridArea: "4 / 4 / 6 / 6",
            borderRadius: "6px",
            overflow: "hidden",
            background: "#222",
            height: "100%",
            boxShadow:
              "0 6px 12px -2px rgba(50, 50, 93, 0.25), 0 3px 7px -3px rgba(0, 0, 0, 0.3)",
          }}
          onClick={() => setStep(step + 1)}
        ></div>
      </main>
    </div>
  );
}

const browserSteps = [
  { loadUrl: "/1.html" },
  { loadUrl: "/2.html" },
  { loadUrl: "/3.html" },
  { loadUrl: "/3.1.html" },
  { loadUrl: "/4.html" },
  { loadUrl: "/5.html" },
  // { loadUrl: "/5.html" },
  { loadUrl: "/6.html" },
];

const codeSteps = [
  {
    code: require(`!!raw-loader!../public/1.html`).default,
    file: "index.html",
    focus: "1:2,11:13",
  },
  {
    code: require(`!!raw-loader!../public/2.html`).default,
    file: "index.html",
    focus: "10:12,14",
  },
  {
    code: require(`!!raw-loader!../public/3.html`).default,
    file: "index.html",
    focus: "10:14,16",
  },
  {
    code: require(`!!raw-loader!../public/3.1.html`).default,
    file: "index.html",
    focus: "12:22",
  },
  {
    code: require(`!!raw-loader!../public/4.html`).default,
    file: "index.html",
    focus: "10:12",
  },
  {
    code: require(`!!raw-loader!../public/5.html`).default,
    file: "index.html",
    focus: "10:12,14:18",
  },
  // {
  //   code: require(`!!raw-loader!../public/5.html`).default,
  //   file: "index.html",
  //   focus: "11[17:34],15[15:31]",
  // },
  {
    code: require(`!!raw-loader!../public/6.html`).default,
    file: "index.html",
    focus: "10:12,14:26",
  },
];
