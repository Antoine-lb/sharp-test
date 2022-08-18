const sharp = require("sharp");

sharp("img/jpeg/dog_1.jpeg").toFile("output.avif", (err, info) => {
  console.log("err", err);
  console.log("info", info);
});
