const express = require('express');
const socketio = require('socket.io');
const app = express();
const cors = require('cors');
const namespaces = require('./data/namespaces');
const Room = require('./classes/Room');
app.use(cors());

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(7000);

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
        console.log('============')
        console.log(socket.handshake)

        const userName = socket.handshake.query.userName
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

                socket.on('joinRoom', async (roomObj, ackCallBack) =>{
                    console.log('request to join ', roomObj.roomTitle)
                    // need to fetch history
                    console.log(namespaces, roomObj.namespaceId)
                    const thisNs = namespaces[roomObj.namespaceId]


                    const thisRoomObj = thisNs.rooms.find(room=>room.roomTitle === roomObj.roomTitle)
                    const thisRoomHistory = thisRoomObj.history;
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
                    socket.join(roomObj.roomTitle)


                    // fetch the number of sockets in this room
                    const sockets = await io.of(namespace.endpoint).in(roomObj.roomTitle).fetchSockets()

                        // console.log(sockets)

                    const socketCount = sockets.length;

                    ackCallBack({
                        numUsers: socketCount,
                        thisRoomHistory
                    })
                  

                })
        socket.on('newMessageToRoom', (messageObj)=>{
            console.log(messageObj)
            // broadcast to all sockets in this room... this room only
            // how can we find out which room this socket is in ?

            const rooms = socket.rooms;
            const currentRoom = [...rooms][1]
            // send out this message to everyone in the room, including the sender
            io.of(namespace.endpoint).to(currentRoom).emit('messageToRoom', messageObj)

            // add this message to the room object history
            const thisNs= namespaces[messageObj.selectedNsId]
            const thisRoom = thisNs.rooms.find(room=>room.title === messageObj.roomTitle)
           
            thisRoom.addMessage(messageObj)
            console.log('this room ', thisRoom)
        })
    })
})




