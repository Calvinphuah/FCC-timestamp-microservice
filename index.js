// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = date => date.toUTCString() === "Invalid Date";

// your first API endpoint... 
app.get("/api/:date?", function (req, res){
  // ? means that it is optional so we set a default to be current time
  if(!req.params.date){
    res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    })
    return;
  } else {
     // Parse date parameter as a number (UNIX timestamp)
     // Unix timestamp must be number when passing into new Date
     const dateInput = req.params.date;
     let date;
 
    // Check if the date input is a valid Unix timestamp (a string representing a number)
    if (!isNaN(dateInput)) {
      date = new Date(parseInt(dateInput)); // Parse as Unix timestamp
    } else {
      date = new Date(dateInput); // Parse as date string
    }
    
    if(isInvalidDate(date)){
      res.json({ error : "Invalid Date" });
      return;
    }

    // Send response with UNIX timestamp and UTC string
    res.json({unix: date.getTime(), utc: date.toUTCString()});
    return;
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
