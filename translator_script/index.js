"use strict";
import translate from "translate-google";
import { promises as fs } from "fs";
import SrtParser from "srt-parser-2";
import path from "path";

const parser = new SrtParser();
const directoryPath = "./EnglishVersionSubtitles";

async function processSubtitles() {
  try {
    const files = await fs.readdir(directoryPath);

    const srtFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".srt"
    );

    if (srtFiles.length === 0) {
      console.error("No .srt files found in the directory.");
      return;
    }

    for (const file of srtFiles) {
      const filePath = path.join(directoryPath, file);
      console.log(`Processing file: ${file}`);
      const data = await fs.readFile(filePath, "utf8");
      let srtData = parser.fromSrt(data);
      srtData = await translateSubtitles(srtData, "fa");
      const translatedSrt = parser.toSrt(srtData);
      const outputFilePath = path.join(
        directoryPath,
        `${path.basename(file, ".srt")}.fa.srt`
      );
      if (translatedSrt.trim()) {
        await fs.writeFile(outputFilePath, translatedSrt, "utf8");
        console.log(`Translated SRT file has been saved as ${outputFilePath}`);
      } else {
        console.error("Error: Translated SRT content is empty.");
      }
    }
  } catch (error) {
    console.error("Error during processing:", error);
  }
}

async function translateSubtitles(subtitles, targetLanguage) {
  for (let subtitle of subtitles) {
    try {
      const translatedText = await translate(subtitle.text, {
        to: targetLanguage,
      });
      subtitle.text = translatedText;
    } catch (error) {
      console.error(`Translation error for text "${subtitle.text}":`, error);
      subtitle.text = subtitle.text; // Fallback to original text if translation fails
    }
  }
  return subtitles;
}

processSubtitles();
