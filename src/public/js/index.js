const socket = io();


//mensaje capturado por el front 1
socket.on('msg_to_front_one', (data) =>{
    console.log(JSON.stringify(data))

})

//mensaje  enviado al back
socket.emit('msg_to_back', {msg: ' linea 11, mensaje desde el front', status: 1});

//mensaje capturado por el front
socket.on('msg_to_front', (data) =>{
    console.log(JSON.stringify(data))

})

//mensaje capturado x el front 2
socket.on('msg_to_front_two', (data)=>{
    console.log(JSON.stringify(data))
})

