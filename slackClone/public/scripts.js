
// const userName = prompt('what is your username? ')
// const password = prompt('what is your password? ')

// const namespaces = require("../data/namespaces");


// always join main namespace because that's  were client gets the namespaces from
const socket = io('http://localhost:5000')
// const socket2 = io('http://localhost:8000/wiki')
// const socket3 = io('http://localhost:8000/mozilla')
// const socket4 = io('http://localhost:8000/linux')

const userName = 'kakha'
const password = 'j'

// sockets will be put in this array, in the index of their id.

const nameSpacesSockets = [];

const listeners = {
    nsChange: []
}


const addListeners =(nsId)=>{
    // purpose is one listener to listen per namespace change ))
    if(!listeners.nsChange[nsId]){
        nameSpacesSockets[nsId].on('nsChange', (data)=>{
            console.log(data)
            console.log('name space changed')
        })
        listeners.nsChange[nsId]=true;
    }
   
}

socket.on('connect', ()=>{
    console.log('client connected')
    socket.emit('clientConnect')
})


// listen to ns List  event from the server which gives as name Spaces
socket.on('nsList', nsData=>{
    console.log(nsData)
    const nameSpacesDiv = document.querySelector('.namespaces')
    console.log(nameSpacesDiv, nsData)
    nameSpacesDiv.innerHTML=''
    nsData.forEach((ns)=>{
        // update html with name space

        nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>
        
        `
        // initialize thisNs as it's index in namespaceSockets

        // if connection is new this will be null, if it's already established and it will reconnect and remain active

        if(!nameSpacesSockets[ns.id]){
          // join this namespace with io
          // there is no socket in this ns id. so make a new connection
          nameSpacesSockets[ns.id] = io(`http://localhost:5000${ns.endpoint}`)
        }
        addListeners(ns.id)
    

    })
    Array.from(document.getElementsByClassName('namespace')).forEach(element=>{
        console.log(element)
        element.addEventListener('click', (e)=>{
           joinNs(element, nsData)

        })
    })

    joinNs(document.getElementsByClassName('namespace')[0], nsData)
})