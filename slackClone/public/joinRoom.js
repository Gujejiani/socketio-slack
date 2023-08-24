function JoinRoom (roomTitle, namespaceId){
    console.log('roomTitle', roomTitle, namespaceId)
    nameSpacesSockets[namespaceId].emit('joinRoom', roomTitle);
}