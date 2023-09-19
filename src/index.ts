import path from 'path';
import express from 'express';
import { v4 as uuid } from 'uuid';
import { User } from './types/user';
import { createServer } from 'http';
import { Database } from './database';
import { Message } from './types/message';
import { Server, Socket } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);
const database = new Database();

io.on('connection', (socket: Socket) => {
  const id = uuid();
  const user = new User(id, socket);

  database.addUser(user);
  io.emit('user:count', { usersCount: database.usersCount });

  socket.on('server:message', (message: Message) => {
    socket.broadcast.emit('user:message', message);
  });

  socket.on('server:typing-start', () => {
    socket.broadcast.emit('user:typing-start');
  });

  socket.on('server:typing-end', () => {
    socket.broadcast.emit('user:typing-end');
  });

  socket.on('server:audio', (data) => {
    socket.broadcast.emit('user:audio', data);
  });

  socket.on('disconnect', () => {
    database.removeUser(id);
    socket.broadcast.emit('user:count', { usersCount: database.usersCount });
  })
});

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', 'views'));

app.all('*', (_req, res) => {
  return res.render('index');
})

server.listen(80, () => {
  console.log('server is running on: http://localhost');
})