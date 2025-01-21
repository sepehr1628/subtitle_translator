import React, { useState } from "react";
import translate from "google-translate-free";
import SubtitlePlaceholder from "../UI/SubtitlePlaceholder";

const Main: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  // Translate text using the LibreTranslate API
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

  const handleDownload = () => {
    if (!translatedText) {
      alert("Please translate the file first.");
      return;
    }

    // Create a Blob with the translated text
    const blob = new Blob([translatedText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "translated_subtitle.srt"; // You can change the file extension if needed
    link.click();
  };

  return (
    <main className="main">
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={removeDraggedOverClass}
        onMouseLeave={removeDraggedOverClass}
      >
        {uploadedFile ? (
          <SubtitlePlaceholder subtitleName={uploadedFile.name} />
        ) : (
          "Drag file here or click to choose file!"
        )}
        <input
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
    </main>
  );
};

export default Main;
