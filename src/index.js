import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import cors from 'cors';
import { sequelize } from './database/models';
import router from './routes/routes';
import { passwordUpdated } from './services/nodeCron';
import { checkSellerExpiredProducts } from './utils/checkProductExpiration';

const app = express();
dotenv.config();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: true,
});
// nodecron restart
passwordUpdated.start();

let onlineUsers = [];
const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => onlineUsers.find((user) => user.userId === userId);
const getAllUsers = () => onlineUsers;

// Listening events using socket.io instance
io.on('connection', (socket) => {
  socket.on('newUser', (userId) => {
    console.log('A client has connected');
    console.log('all connected users', onlineUsers);
    addNewUser(userId, socket.id);
    checkSellerExpiredProducts(userId);
  });

  // Notifications events
  socket.on('notification', (data) => {
    io.emit('notification', data);
  });

  socket.on('status', (data) => {
    console.log('status changing', data);
    io.emit('status', data);
  });

  // Listening to chat events
  socket.on('disconnect', () => {
    console.log('User disconnected');
    removeUser(socket.id);
  });

  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`);
    io.emit('chat message', { name: socket.name, message: msg });
  });

  socket.on('user joined', (name) => {
    console.log(`${name} has joined the chat`);
    socket.name = name;
    io.emit('user joined', name);
  });
});

app.use(router);

const port = process.env.PORT || 4000;
server.listen(port, async () => {
  console.log(`App listening on port ${port}`);
  await sequelize.authenticate();
  console.log('Database Connected!');
});

export { io, getUser, getAllUsers };
export default app;
