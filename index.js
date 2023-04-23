const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const utils = require('./Utils');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));
app.get('/', async (req, res) => {
   res.sendFile( __dirname + "/" + "index.html" );
});

app.post('/gen', async (req, res) => {
  if ((req.body.url_name != "" || !req.body.url_name.includes(".")) && req.body.url_name.length <= 2048){
    let id = await utils.getID(req.body.url_name);
    res.send("Sucess! now your shortned page is: https://UnpleasantRectangularInstructionset.f-alotaibi.repl.co/" + id);
  } else {
    res.redirect("/");
  }
})

app.get('/:shortUrl', async (req, res) => {
  let fullurl = await utils.getURL(req.params.shortUrl);
  if (fullurl){
    res.redirect(fullurl);
  } else {
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log('server started');
});
