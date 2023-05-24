import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { sequelize } from './database/models';
import router from './routes/routes';

const app = express();
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: true,
});

// Listening events using socket.io instance
io.on('connection', (socket) => {
  console.log('A client has connected');

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

export { io };
export default app;
