import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseURL: string = environment.apiURL;
  socketURL: string = environment.socketURL;

  private socket: Socket;
  onMessage = new Subject();

  constructor(private httpClient: HttpClient) {

    setTimeout(() => {
      
      this.socket = io('http://localhost:3003'); // Replace with your server URL
      this.socket.on('connect', () => {
        console.log('Connected to server');
        
        this.socket.on('message', (data) => {
          console.log("message from server", data)
          this.onMessage.next(JSON.parse(data));
        })
      });
      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }, 6000);
  }

  getAllNotifications(q?: string) {
    let url = `${this.baseURL}/notifications`
    if (q) url += `?${q}`
    return this.httpClient.get(url);
  }
  markNotificationRead(id: string) {
    return this.httpClient.put(`${this.baseURL}/notifications/read/${id}`, { id });
  }



  // Emit an event to the server
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen for an event from the server
  onEvent(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }


}
