
// const userName = prompt('what is your username? ')
// const password = prompt('what is your password? ')


// always join main namespace because that's  were client gets the namespaces from
const socket = io('http://localhost:9000')
// const socket2 = io('http://localhost:9000/wiki')
// const socket3 = io('http://localhost:9000/mozilla')
// const socket4 = io('http://localhost:9000/linux')

const userName = 'kakha'
const password = 'j'



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
        // join this namespace with io

        const socket = io(`http://localhost:9000${ns.endpoint}`).on('connect', ()=>{
            console.log('we are connected baby')
        })

    })
    Array.from(document.getElementsByClassName('namespace')).forEach(element=>{
        console.log(element)
        element.addEventListener('click', (e)=>{
           joinNs(element, nsData)

        })
    })

    joinNs(document.getElementsByClassName('namespace')[0], nsData)
})