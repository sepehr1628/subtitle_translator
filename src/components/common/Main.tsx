import { useState } from "react";
import SubtitlePlaceholder from "../UI/SubtitlePlaceholder";

const Main: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    removeDraggedOverClass();
    if (file?.name.endsWith(".srt")) {
      setUploadedFile(file);
      readFile(file);
      console.log(file.name);
    } else {
      alert("Unsupported file type. Please upload a .srt file.");
    }
  }

  function readFile(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      console.log("File content:", reader.result);
    };

    reader.onerror = () => {
      console.error("Error reading file:", reader.error);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const dropZone = e.currentTarget as HTMLDivElement;
    dropZone.classList.add("dragged-over");
  }

  function handlePointerLeave() {
    removeDraggedOverClass();
  }

  function removeDraggedOverClass() {
    const dropZone = document.querySelector(".drop-zone");
    if (dropZone) {
      dropZone.classList.remove("dragged-over");
    }
  }

  return (
    <main className="main">
      <div
        className="drop-zone"
        onClick={() => console.log("clicked")}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handlePointerLeave}
        onMouseLeave={handlePointerLeave}
      >
        {uploadedFile ? (
          <SubtitlePlaceholder subtitleName={uploadedFile.name} />
        ) : (
          "drag file here or click to choose file!"
        )}
        <input
          type="file"
          name="subtitle_input"
          accept=".srt"
          draggable="true"
          className="subtitle-input"
        />
      </div>
    </main>
  );
};

export default Main;
