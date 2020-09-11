import React, { Children } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MiniBrowser } from "@code-hike/mini-browser";
import { MiniEditor } from "@code-hike/mini-editor";
import { Video } from "@code-hike/player";
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
  const { videoSteps, browserSteps, codeSteps, captionSteps } = getStepsFromMDX(
    children
  );
  return (
    <Screencast
      videoSteps={videoSteps}
      browserSteps={browserSteps}
      codeSteps={codeSteps}
      captionSteps={captionSteps}
    />
  );
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

  const videoSteps = splits.map((split) => {
    const videoElement = split.find((child) => child.props.mdxType === "Video");
    return videoElement.props;
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

  const captionSteps = splits.map((split) => {
    const pre = split.find(
      (child) =>
        child.props.mdxType === "pre" &&
        child.props.children.props.className === "language-srt"
    );
    if (!pre) return [];

    return parseSrt(pre.props.children.props.children);
  });

  return {
    videoSteps,
    browserSteps,
    codeSteps,
    captionSteps,
  };
}

function parseSrt(srt) {
  const regex = /^[\d\.\:]+\s+[–\-]>\s+[\d\.\:]+$/gm;
  const times = srt.match(regex);
  if (!times) return [];
  const [, ...texts] = srt.split(regex);
  return times.map((time, i) => {
    const [start, end] = time.match(/[\d\.]+/g).map((t) => +t);
    return { start, end, text: texts[i].trim() };
  });
}

function Screencast({ videoSteps, browserSteps, codeSteps, captionSteps }) {
  const [step, setStep] = React.useState(0);
  const [videoTime, setVideoTime] = React.useState(videoSteps[0].start);
  const [progress] = useSpring(step, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
  });
  const playerRef = React.useRef();

  const caption = useCaption(captionSteps, step, videoTime);

  const onTimeChange = (newTime, oldTime) => {
    setVideoTime(newTime);
  };

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
            whiteSpace: "pre",
            color: "#ddd",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            fontSize: "1.4em",
            lineHeight: "1.4em",
            textAlign: "center",
          }}
        >
          {caption}
        </div>
      </main>

      <div style={{ marginTop: 48, height: 32 }}>
        <button onClick={() => playerRef.current.play()}>Play</button>
        <Video
          steps={videoSteps}
          containerStyle={{
            height: "100px",
            display: "none",
          }}
          onStepChange={setStep}
          onTimeChange={onTimeChange}
          ref={playerRef}
        />
      </div>
    </div>
  );
}

function useCaption(captionSteps, stepIndex, videoTime) {
  const stepCaptions = captionSteps[stepIndex];

  if (!stepCaptions) return null;

  const caption = stepCaptions.find(
    ({ start, end }) => start <= videoTime && videoTime < end
  );

  return caption ? caption.text : null;
}
