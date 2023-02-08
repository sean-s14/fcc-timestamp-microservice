// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const current_date = new Date();
  return res.json({
    unix: Date.now(),
    utc: current_date.toUTCString(),
  });
});

app.get("/api/:date([0-9]{13})", (req, res) => {
  const { date } = req.params;
  const parsedDate = parseInt(date);
  const newDate = new Date(parsedDate);
  return res.json({ unix: parsedDate, utc: newDate.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  const timestamp = Date.parse(date);
  if (isNaN(timestamp)) {
    return res.json({ error: "Invalid Date" });
  }
  const newDate = new Date(date);
  return res.json({
    unix: newDate.getTime(),
    utc: newDate.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
