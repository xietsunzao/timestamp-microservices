const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date?', (req, res) => {
    let { date } = req.params;

    if (!date) {
        date = new Date();
    } else {
        if (!isNaN(date)) {
            date = parseInt(date);
        }
        date = new Date(date);
    }

    if (isNaN(date.getTime())) {
        res.json({ error: 'Invalid Date' });
    } else {
        res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port http://localhost:' + listener.address().port);
});
