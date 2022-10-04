const fs = require("fs");
const sharp = require("sharp");

const dir = "./target/jpeg/";

const EXTENTIONS = [
  "jpeg",
  "jpg",
  "png",
  "webp",
  "gif",
  //   "bmp",
  //   "tiff",
  //   "svg",
  //   "ico",
];

function formatBytes(bytes = 0, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function createFile(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);

    console.log(folder, " created");
  }
}

function forEachFileInFolder(folder, callback) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(async (file) => {
      callback(folder, file);
    });
  } catch (err) {
    console.log(err);
  }
}

function getAverageBytesOfDir(folder) {
  let array = [];

  forEachFileInFolder(folder, (file, folder) => {
    try {
      const stats = fs.statSync(`${folder}${file}`);
      array.push(stats.size);
      console.log(stats.size / 1000, " kb ", file);
    } catch (err) {
      console.log(`could not open ${file}`, err);
    }
  });

  const average = array.reduce((a, b) => a + b, 0) / array.length;
  console.log(average / 1000, " kb ", "avarage");
  return average;
}

function transformImages(folder) {
  createFile("./output");
  forEachFileInFolder(folder, (folder, file) => {
    console.log("file", file);
    const splitedFile = file.split(".");
    EXTENTIONS.forEach((extention) => {
      createFile(`./output/${extention}`);

      //   console.log(`put ${folder}${file} in ${splitedFile[0]}.${extention}  `);
      sharp(`${folder}${file}`).toFile(
        `./output/${extention}/${splitedFile[0]}.${extention}`,
        (err, info) => {
          if (err)
            console.log(`Error file=${file} extention=${extention}`, err);
          console.log(
            `size=${formatBytes(info?.size)} format=${info?.format} w=${
              info?.width
            } h=${info?.height}`
          );
        }
      );
    });
  });
}

function transformImageToAllExtentions(folder, image) {}

transformImages(dir);
