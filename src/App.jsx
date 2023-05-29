import {
  Excalidraw,
  exportToClipboard,
  serializeAsJSON,
} from "@excalidraw/excalidraw";
import { useState } from "react";

function App() {
  const [excalidrawApi, setExcalidrawApi] = useState(null);

  const getClipboard = async () => {
    if (!excalidrawApi) {
      return console.log("404");
    }

    await exportToClipboard({
      elements: excalidrawApi.getSceneElements(),
      appState: excalidrawApi.getAppState(),
      files: excalidrawApi.getFiles(),
      type: "json",
    });
    window.alert(`Copied to clipboard as 'json' successfully`);
  };

  const getJson = () => {
    const json = serializeAsJSON({
      elements: excalidrawApi.getSceneElements(),
      appState: excalidrawApi.getAppState(),
      files: excalidrawApi.getFiles(),
      type: "local",
    });
    alert(json);
  };

  const setItem = (elements, appState, files) => {
    console.log({ elements, appState, files });
    localStorage.setItem("elements", JSON.stringify(elements));
    localStorage.setItem("files", JSON.stringify(files));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Excalidraw
        ref={(api) => setExcalidrawApi(api)}
        onChange={setItem}
        initialData={{
          elements: JSON.parse(localStorage.getItem("elements")),
          files: JSON.parse(localStorage.getItem("files")),
          appState: { theme: "dark" },
        }}
      />
      <button
        style={{
          zIndex: 99999,
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
        onClick={getJson}
      >
        Get Data
      </button>
    </div>
  );
}

export default App;
