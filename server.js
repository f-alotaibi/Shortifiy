const express = require('express');
const rateLimiter = require("express-rate-limit");
const app = express();

const utils = require('./Utils');
const PORT = process.env.APP_PORT || 3000;

const urlLimiter = rateLimiter({
  max: 3,
  windowMS: 10000,
  message: "Too many requests, try again later"
})

app.use(express.json())

app.use(express.static('public'));
app.get('/', async (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});

app.post('/gen', urlLimiter, async (req, res) => {
  let url_name = req.body.url_name;
  if (url_name != "" && (url_name.includes(".") && !url_name.endsWith(".")) && url_name.length <= 2048) {
    let id = await utils.getID(url_name);
    res.json({ message: id, iscreated: 'true' });
  } else {
    res.json({ message: "Invalid input" });
  }
  res.end();
})

app.get('/:shortUrl', async (req, res) => {
  let fullurl = await utils.getURL(req.params.shortUrl);
  if (fullurl) {
    res.redirect(fullurl);
  } else {
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log('server started on port ' + PORT);
});
