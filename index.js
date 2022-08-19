const sharp = require("sharp");

const FOLDER_PATH = "img/HEIC/"; // with last slash
const FILE_NAME = "IMG_6327";
const FILE_EXTENTION = ".HEIC";

const OUTPUT_PATH = "output/"; // with last slash

const EXTENTIONS = [
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
  ".tiff",
  ".svg",
  ".ico",
];

EXTENTIONS.forEach((extention) => {
  console.log("=== ", extention, " ====");
  sharp(`${FOLDER_PATH}${FILE_NAME}${FILE_EXTENTION}`).toFile(
    `${FILE_NAME}${extention}`,
    (err, info) => {
      console.log("err", err);
      console.log("info", info);
    }
  );
  console.log("======");
});
