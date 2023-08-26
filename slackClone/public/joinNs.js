

const joinNs =(element, nsData)=>{
    const nsEndpoint = element.getAttribute('ns')
    console.log(nsEndpoint)
    const clickedNs = nsData.find((row)=> row.endpoint ===nsEndpoint)
    console.log('clicked', clickedNs)
    const rooms = clickedNs.rooms;

    let roomList = document.querySelector('.room-list');

    // clear rooms
    roomList.innerHTML = "";
    
    //  init first room
    let firstRoom


    // loop thorough each room and add to dom
    console.log('rooms ', rooms)
    rooms.forEach((room, i)=>{
        if(i===0){
            firstRoom = room.roomTitle
        }


        console.log('room', room)
        roomList.innerHTML += `<li namespaceId=${room.namespaceId} class="room" ><span class="fa-solid fa-${room.privateRoom? 'lock': 'globe'}"></span>${room.roomTitle}</li>
        `
    })

    // init join first room
    console.log('here ', firstRoom, clickedNs.namespaceId)
    JoinRoom(firstRoom, clickedNs.id)

    // add click listener to each room so client can tell server to change room

    const roomNodes = document.querySelectorAll('.room')

    Array.from(roomNodes).forEach((element)=>{

       
        element.addEventListener('click', (e)=>{
           
            const namespaceId = element?.getAttribute('namespaceId')
            JoinRoom(e.target.innerText, namespaceId)
        })
    })


}
