import { Socket } from 'socket.io';

export class User {
  public readonly id: string;
  public readonly socket: Socket;

  constructor(id: string, socket: Socket) {
    this.id = id;
    this.socket = socket;
  }
}