const socket = io('http://localhost:8000',{ transports: ["websocket"] });

const form = document.getElementById('send-container');
const messageinpt = document.getElementById('messageinp');
const messagecontainer = document.querySelector('.container');
var audio = new Audio('ring.mp3')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinpt.value;
    append(`you:${message}`,'right');
    socket.emit('send' , message);
    messageinpt.value='';
    if(position = 'left')
    {
        audio.play();
    }

})

const name = prompt('enter your name');

const append = (message,position)=>{
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
}

socket.emit("new-user-joined",name);

socket.on('user-joined' , name =>{
    append(`${name} join the chat`,'left');
})

socket.on('receive' , data =>{
    append(`${data.name}:${data.message}`,'left');
})
socket.on('left' , data =>{
    append(`${data}:left the chat`,'left');
})