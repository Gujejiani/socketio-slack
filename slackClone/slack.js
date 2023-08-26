const express = require('express');
const socketio = require('socket.io');
const app = express();
const cors = require('cors');
const namespaces = require('./data/namespaces');
const Room = require('./classes/Room');
app.use(cors());

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(5000);

const io = socketio(expressServer)


 
//app.set('io', io)    => >> >> > >> > and than we can retrieve it with const io = app.get('io)      mmmm quite nice one ha ?

// manufactured way to change namespace just an example 
app.get('/change-ns', (req, res, next)=>{
    // update namespaces array
    namespaces[0].addRoom(new Room(0, 'Deleted Articles ', 0))

    // let everyone now in this namespace that it change
    io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0])
    res.json(namespaces[0])
})


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
   console.log('I runnn')
    io.of(namespace.endpoint).on('connection', (socket)=>{
                //console.log(socket.id, 'has connected to ', namespace.name)

                socket.on('joinRoom', async (roomTitle, ackCallBack) =>{
                    console.log('request to join ', roomTitle)

                    // leave all rooms (except the own room)
                    const rooms = socket.rooms;
                    console.log(rooms)
                    let i =0
                    rooms.forEach(room=>{
                        // we don't want to leave the default room 1

                        if(i !== 0){
                            socket.leave(room)
                           
                        }
                        i++
                    })




                    // server should join the room
                    // Note room title is coming from client, which is not safe you have to validate it somehow
                    socket.join(roomTitle)


                    // fetch the number of sockets in this room
                    const sockets = await io.of(namespace.endpoint).in(roomTitle).fetchSockets()

                        // console.log(sockets)

                    const socketCount = sockets.length;

                    ackCallBack({
                        numUsers: socketCount,
                    })
                  

                })
    })
})




