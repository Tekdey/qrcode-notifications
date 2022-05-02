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
    from: `Look behind you <${process.env.EMAIL_SENDER}>`,
    to: `${process.env.EMAIL_RECEIVER}`,
    subject: "Someone scan the qr code",
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
    <title>I see you :)</title>
    <div style="display:flex; flex-direction:column; align-items:center;">
      <h1 style="font-size:90px; font-family:sans-serif;">I see you :)</h1>
      <button id='button' style="width: 500px; height:100px; font-size:35px;  font-family:sans-serif;">CLICK AND TURN UP THE SOUND</button>
      <img src="https://c.tenor.com/o656qFKDzeUAAAAM/rick-astley-never-gonna-give-you-up.gif" style="width:500px;" draggable=false />
        <audio controls loop="loop" autoplay="autoplay" id="song">
          <source src="/rick_astley.mp3" type="audio/mpeg" />
        </audio>
    </div>
    <script>
      const button = document.getElementById('button');
      document.addEventListener('click', () => {
        song.play()
      })
    </script>

    `
  );
});

app.listen(PORT, () => console.log("✅"));
