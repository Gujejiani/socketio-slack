const joinNs =(element, nsData)=>{
    const nsEndpoint = element.getAttribute('ns')
    console.log(nsEndpoint)
    const clickedNs = nsData.find((row)=> row.endpoint ===nsEndpoint)
    console.log('clicked', clickedNs)
    const rooms = clickedNs.rooms;

    let roomList = document.querySelector('.room-list');

    // clear rooms
    roomList.innerHTML = "";
    
    // loop thorough each room and add to dom
    console.log('rooms ', rooms)
    rooms.forEach(room=>{
        roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>
        `
    })
}