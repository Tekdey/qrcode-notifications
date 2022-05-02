const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(
    ` <img src="https://c.tenor.com/o656qFKDzeUAAAAM/rick-astley-never-gonna-give-you-up.gif" />`
  );
});

app.listen(PORT, () => console.log("✅"));
