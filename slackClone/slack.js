const express = require('express');
const socketio = require('socket.io');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);

    const io = socketio(expressServer)

    io.on('connection', (socket) => {
        console.log(socket.id, 'connected');
        // in ws we use send method and in socket.io we use emit event
    //socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });

        socket.emit('welcome', 'welcome to the server baby')
})






