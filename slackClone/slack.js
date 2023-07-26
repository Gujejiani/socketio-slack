const express = require('express');
const socketio = require('socket.io');
const app = express();
const cors = require('cors');
const namespaces = require('./data/namespaces')
app.use(cors());

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);



    const io = socketio(expressServer)


    // connection = '/'
    io.on('connection', (socket) => {
        // in ws we use send method and in socket.io we use emit event
    //socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });

        socket.emit('welcome', 'welcome to the server baby')


        socket.on('clientConnect', (data)=>{
            console.log(socket.id, ' has connected');

            socket.emit('nsList', namespaces)
        })

})

namespaces.forEach(namespace=>{
   
    io.of(namespace.endpoint).on('connection', (socket)=>{
                console.log(socket.id, 'has connected to ', namespace.name)
    })
})




