import { ReactNode, useRef, useState } from "react";

interface DropZoneProps {
  children: ReactNode;
  setUploadedFile: (file: File | null) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ children, setUploadedFile }) => {
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const translateText = async (text: string, targetLanguage: string) => {
    try {
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          targetLanguage,
        }),
      });
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return "Translation failed.";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    removeDraggedOverClass();
    if (file?.name.endsWith(".srt")) {
      setUploadedFile(file);
      readFile(file);
    } else {
      alert("Unsupported file type. Please upload a .srt file.");
    }
  };
  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const fileContent = reader.result as string;
      console.log(fileContent);
      const translated = await translateText("Hello World", "fa");
      setTranslatedText(translated);
    };
    reader.onerror = () => {
      console.error("Error reading file:", reader.error);
    };
    reader.readAsText(file);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("dragged-over");
  };
  const removeDraggedOverClass = () => {
    const dropZone = document.querySelector(".drop-zone");
    dropZone?.classList.remove("dragged-over");
  };

  const handleClickDropZone = () => {
    inputRef.current?.click();
  };
  return (
    <div
      className="drop-zone"
      onClick={handleClickDropZone}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={removeDraggedOverClass}
      onMouseLeave={removeDraggedOverClass}
    >
      {children}
      <input
        ref={inputRef}
        type="file"
        className="subtitle-input"
        name="subtitle_input"
        accept=".srt"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
        }}
      />
    </div>
  );
};
export default DropZone;
