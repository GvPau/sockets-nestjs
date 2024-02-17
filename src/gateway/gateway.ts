import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  usersConnected: number = 0;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected with id: ', socket.id);

      this.usersConnected++;
      console.log('Number of clients connected: ', this.usersConnected);

      this.updateUsersConnected();

      socket.on('disconnect', () => {
        console.log('Client disconncted', socket.id);
        this.usersConnected--;
        this.updateUsersConnected();
      });
    });
  }

  @SubscribeMessage('message')
  onMessage(@MessageBody() message: any) {
    console.log('Message receive on the server, fordwarding.. ', message);
    this.server.emit('OnMessage', message);
  }

  updateUsersConnected() {
    this.server.emit('OnUpdateUsersConnected', this.usersConnected);
  }
}
