const express = require('express');
const Rooms = require('./Session/Rooms');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

app.set('port', (process.env.PORT || 3000));
app.use(express.static('static'));

const rooms = new Rooms(io);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/createNewRoom', (req, res) => {
    const roomId = rooms.createNewRoom();
    res.redirect(`/session.html?sessionId=${roomId}`);
});

http.listen(app.get('port'), function() {
    console.log(`server listen with ${app.get('port')} port`);
});
