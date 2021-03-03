const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder 
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot'

//Run when client connects

io.on('connection', socket => {
socket.on('joinRoom', ({username, room}) => {
    user = userJoin(socket.id, username, room)
    socket.join(user.room)

    //Creat message for users conole
    socket.emit('message', formatMessage(botName,'Welcome to chatBox'));

    //Broadcast to all other user when user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`))
})

    //Broadcast to all other user when user connects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,`${user.username} has left the chat`));
    })

    //Listen for Chat message
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER',msg));
    })

    //Broadcast message to all users
    io.emit()
});

const PORT = 3000 || process.env.PORT;


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));