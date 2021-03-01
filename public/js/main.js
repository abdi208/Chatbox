const chatForm = document.getElementById('chat-form');
const ChatMessages = document.querySelector('.chat-messages');


const socket = io();

socket.on('message', message => {
    console.log(message);
    outputMessage(message);


    //Scroll
    ChatMessages.scrollTop = ChatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);

    //Clear Input

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})


function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}