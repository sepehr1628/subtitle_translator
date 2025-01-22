"use strict";
import { translate } from "@vitalets/google-translate-api";
import { readFile, writeFile } from "fs";
import SrtParser from "srt-parser-2";

const parser = new SrtParser();

readFile("./EnglishVersionSubtitles/ss.srt", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  console.log(data);

  let srtData = parser.fromSrt(data);

  srtData = await translateSubtitles(srtData, "fa");

  const translatedSrt = parser.toSrt(srtData);

  writeFile("./EnglishVersionSubtitles/ss.srt", translatedSrt, (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
    console.log("Translated SRT file has been saved.");
  });
});

async function translateSubtitles(subtitles, targetLanguage) {
  for (let subtitle of subtitles) {
    try {
      console.log(subtitle);
      const result = await translate(subtitle.text, { to: targetLanguage });
      subtitle.text = result.text;
    } catch (error) {
      console.error(`Translation error for text "${subtitle.text}":`, error);
    }
  }
  return subtitles;
}
