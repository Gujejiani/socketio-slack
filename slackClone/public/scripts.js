
const userName = prompt('what is your username? ')
const password = prompt('what is your password? ')
const socket = io('http://localhost:9000')


socket.on('connect', ()=>{
    console.log('client connected')
    socket.emit('clientConnect')
})


// listen to ns List  event from the server which gives as name Spaces
socket.on('nsList', nsData=>{
    console.log(nsData)
    const nameSpacesDiv = document.querySelector('.namespaces')
    console.log(nameSpacesDiv, nsData)
    nsData.forEach((ns)=>{
        // update html with name space

        nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.name}"><img src="${ns.image}"></div>
        `
    })
})