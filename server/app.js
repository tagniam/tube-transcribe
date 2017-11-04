const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const routes = require('./routes');

mongoose.connect('mongodb://localhost/tubetranscribe', {useMongoClient: true});

mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb://localhost:27017/tubetranscribe');
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use('/api', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
   console.log('Listening on port ' + port);
});
