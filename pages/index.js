import React from "react"
import { MiniBrowser } from "@code-hike/mini-browser"
import { MiniEditor } from "@code-hike/mini-editor"
import { useSpring } from "use-spring"
import {
  browserSteps,
  codeSteps,
  overlaySteps,
} from "../src/steps"

export default function Page() {
  return (
    <Screencast
      browserSteps={browserSteps}
      codeSteps={codeSteps}
      overlaySteps={overlaySteps}
    />
  )
}

function Screencast({
  browserSteps,
  codeSteps,
  overlaySteps,
}) {
  const [step, setStep] = React.useState(0)
  const [progress] = useSpring(step, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
  })

  const Over = overlaySteps[Math.round(progress)]

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        overflow: "hidden",
      }}
    >
      <style jsx global>{`
        .ch-frame .ch-editor-body code {
          font-size: 25px;
          line-height: 1.2em;
        }
        body,
        html {
          margin: 0;
        }
      `}</style>

      <div style={{ marginBottom: 48, height: 32 }}></div>
      <Over>
        <main
          style={{
            width: 1024,
            height: 576,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gridColumnGap: "16px",
            gridRowGap: "16px",
            padding: 16,
            boxSizing: "border-box",
          }}
        >
          <MiniEditor
            style={{
              gridArea: "1 / 1 / 6 / 4",
              height: "100%",
            }}
            steps={codeSteps}
            lang="html"
            file="index.html"
            progress={progress}
          />
          <MiniBrowser
            steps={browserSteps}
            prependOrigin
            url="/hello-world"
            style={{ gridArea: " 1 / 4 / 6 / 6" }}
            zoom={2.4}
            progress={progress}
          />
        </main>
      </Over>

      <div style={{ marginTop: 48, height: 32 }}>
        <button onClick={() => setStep(s => s - 1)}>
          Prev
        </button>
        <button onClick={() => setStep(s => s + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
