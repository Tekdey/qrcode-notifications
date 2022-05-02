const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// nodemailer

async function notifyMe() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.PASSWORD_SENDER,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let info = await transporter.sendMail({
    from: `Regarde derriere toi <${process.env.EMAIL_SENDER}>`,
    to: `${process.env.EMAIL_RECEIVER}`,
    subject: "Quelqu'un a scanné le qr code",
    html: "😎",
  });
}
app.use(express.static(__dirname + "/public"));
app.use(express());

// route

app.get("/", (req, res) => {
  notifyMe();
  res.send(
    ` 
    <title>Je te vois :)</title>
    <div style="display:flex; flex-direction:column; align-items:center;">
      <h1>Je te vois :)</h1>
      <img src="https://c.tenor.com/o656qFKDzeUAAAAM/rick-astley-never-gonna-give-you-up.gif" style="width:200px;" />
        <audio controls loop="loop" autoplay="autoplay">
          <source src="/rick_astley.mp3" type="audio/mpeg" />
        </audio>
    </div>
    `
  );
});

app.listen(PORT, () => console.log("✅"));
