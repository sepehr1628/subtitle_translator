import SubtitlePlaceholder from "../UI/SubtitlePlaceholder";
import DropZone from "../UI/DropZone";
import { useState } from "react";

const Main: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <main className="main">
      <DropZone setUploadedFile={setUploadedFile}>
        {uploadedFile ? (
          <SubtitlePlaceholder subtitleName={uploadedFile.name} />
        ) : (
          "Drag file here or click to choose file!"
        )}
      </DropZone>
    </main>
  );
};

export default Main;
