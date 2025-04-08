const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");

const Path = require("path");
const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, callback) => {
  const validExts = [".png", ".jpg", ".jpeg"];

  if (!validExts.includes(Path.extname(file.originalname))) {
    return callback(new Error("Only .png, .jpg & .jpeg file format allowed"));
  }

  const fileSize = parseInt(req.headers["content-length"]);

  if (fileSize > 1048576) {
    return callback(new Error("File size is big"));
  }

  callback(null, true);
};

const upload = multer({
  storage: uploadStorage,
  fileFilter: fileFilter,
  fileSize: 1048576,
});
const app = express();
app.use(cors({}));

// app.get("/", (req, res) => {
//   var data = fs.readFileSync("myfile.html");

//   if (data) res.sendFile("./myfile.html");
// });
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});
app.listen(3000, () => console.log(`http://localhost:3000`));
