import React, { Children } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MiniBrowser } from "@code-hike/mini-browser";
import { MiniEditor } from "@code-hike/mini-editor";
import { useSpring } from "use-spring";
import Steps from "../steps.mdx";

export default function Page() {
  return (
    <MDXProvider components={components}>
      <Steps />
    </MDXProvider>
  );
}

const components = {
  wrapper: Wrapper,
};

function Wrapper({ children }) {
  const { browserSteps, codeSteps } = getStepsFromMDX(children);
  return <Screencast browserSteps={browserSteps} codeSteps={codeSteps} />;
}

function getStepsFromMDX(children) {
  const splits = [[]];

  Children.forEach(children, (child) => {
    if (child.props.mdxType === "hr") {
      splits.push([]);
    } else {
      const lastSplit = splits[splits.length - 1];
      lastSplit.push(child);
    }
  });

  const browserSteps = splits.map((split) => {
    const browserElement = split.find(
      (child) => child.props.mdxType === "Browser"
    );
    const { children, ...rest } = browserElement.props;
    const actions = Children.map(children, (child) => child.props);
    return {
      actions,
      ...rest,
    };
  });

  const codeSteps = splits.map((split) => {
    const editorElement = split.find(
      (child) => child.props.mdxType === "Editor"
    );
    const { code, ...rest } = editorElement.props;
    return {
      code: require(`!!raw-loader!../public/${code}.html`).default,
      // file: tab,
      ...rest,
    };
  });

  return {
    browserSteps,
    codeSteps,
  };
}

function Screencast({ browserSteps, codeSteps }) {
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
          style={{ gridArea: "1 / 1 / 6 / 4" }}
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

      <div style={{ marginTop: 48, height: 32 }}>
        <button onClick={() => setStep((s) => s - 1)}>Prev</button>
        <button onClick={() => setStep((s) => s + 1)}>Next</button>
      </div>
    </div>
  );
}
