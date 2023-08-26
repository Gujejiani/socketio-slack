async function JoinRoom (roomTitle, namespaceId){
    console.log('roomTitle', roomTitle, namespaceId)
  const ackResp = await  nameSpacesSockets[namespaceId].emitWithAck('joinRoom', roomTitle)

    document.querySelector('.curr-room-num-users').innerHTML = ` ${ackResp.numUsers} <span class="fa-solid fa-user"></span>`
   document.querySelector('.curr-room-text').innerHTML = `${roomTitle}`

   
   // nameSpacesSockets[namespaceId].on('historyCatchUp', (history)=>{


//    nameSpacesSockets[namespaceId].emit('joinRoom', roomTitle, (ackResp)=>{
//     console.log(ackResp)

//     document.querySelector('.curr-room-num-users').innerHTML = ` ${ackResp.numUsers} <span class="fa-solid fa-user"></span>`
//     document.querySelector('.curr-room-text').innerHTML = `${roomTitle}`
// });
}