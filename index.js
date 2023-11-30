const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date', (req, res) => {
    const { date } = req.params;
    let dateObject;

    if (isNaN(date)) {
        dateObject = new Date(date);
    } else {
        dateObject = new Date(parseInt(date));
    }

    if (isNaN(dateObject.getTime())) {
        res.json({ error: 'Invalid Date' });
    } else {
        res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
    }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port http://localhost:' + listener.address().port);
});
