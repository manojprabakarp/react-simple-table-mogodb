const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let config = {};
config.port = 3001;
require(`${__dirname}/routeProxy.js`).init(app);

app.get('*', function (req, res) {
    res.status(404);
    res.send("Not Found");
});

const httpsServer = https.createServer({
    key: fs.readFileSync(__dirname + '/config/key.pem', 'utf8'),
    cert: fs.readFileSync(__dirname + '/config/certificate.pem', 'utf8')
}, app).listen(config.port);

process.on('uncaughtException', (err) => {
    console.log(err);
});

process.on('exit', (code) => {
    console.error('Server exited with code:', code);
});

process.on('SIGINT', () => {
    const msg = ' Server process got SIGINT ';
    closeServer(() => {
        console.error(msg);
        process.exit(1);
    });
});

function closeServer(cb) {
    httpsServer.close();
    cb();
}

console.log('Server started on', config.port, 'port');
