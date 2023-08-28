async function JoinRoom (roomTitle, namespaceId){
    console.log('roomTitle', roomTitle, namespaceId)

    //emitWithAck possible because of socketio-acknowledgements and it returns a promise which is a callback from the server
  const ackResp = await  nameSpacesSockets[namespaceId].emitWithAck('joinRoom', {roomTitle, namespaceId})

    document.querySelector('.curr-room-num-users').innerHTML = ` ${ackResp.numUsers} <span class="fa-solid fa-user"></span>`
   document.querySelector('.curr-room-text').innerHTML = `${roomTitle}`

   // we get aknowledgement from server with thisRoomHistory data as well
   document.querySelector('#messages').innerHTML = "";
   ackResp.thisRoomHistory.forEach(history => {
         const newMessage = buildMessageHtml(history)
       
         document.querySelector('#messages').innerHTML += newMessage
   });
   
   // nameSpacesSockets[namespaceId].on('historyCatchUp', (history)=>{


//    nameSpacesSockets[namespaceId].emit('joinRoom', roomTitle, (ackResp)=>{
//     console.log(ackResp)

//     document.querySelector('.curr-room-num-users').innerHTML = ` ${ackResp.numUsers} <span class="fa-solid fa-user"></span>`
//     document.querySelector('.curr-room-text').innerHTML = `${roomTitle}`
// });
}