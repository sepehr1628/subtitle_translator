// import { useEffect } from "react";

const Main: React.FC = () => {
  // let inputFile: Element;

  // useEffect(function () {
  //   inputFile = document.querySelector(".subtitle-input")! as HTMLInputElement;
  // }, []);

  // function handleClick() {
  //   inputFile.click();
  // }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log(e);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <main className="main">
      <div
        className="drop-zone"
        onClick={() => console.log("clicked")}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
      >
        <input
          type="file "
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
