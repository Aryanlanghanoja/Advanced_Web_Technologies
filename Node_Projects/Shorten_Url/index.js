const express = require("express");
const url = require("url");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let myUrl = url.parse(req.query.link);
  
  if (!myUrl.protocol || !myUrl.host) {
    return res.json({ msg: "Invalid URL" });
  }

  let shorten_code = Math.floor(Math.random() * 999999);
  let data = loadData();
  let key = Object.keys(data).find((key) => data[key] === myUrl.href);

  if (data[shorten_code]) {
    console.log(data[shorten_code]);
  } else if (key) {
    shorten_code = key;
  } else {
    data[shorten_code] = myUrl.href;
    saveData(data);
  }

  res.json({ "Shorten Code": shorten_code, "Original Url": myUrl.href });
});

function loadData() {
  try {
    let data = fs.readFileSync("data.json");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function saveData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
}

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
