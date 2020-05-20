import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[] {
     return this.messages.slice();
   }

   getMessage(messageId: string): Message {
    return this.messages.find(x => x.messageId === messageId ? x : null);
   }

   addMessage(message: Message) {
     this.messages.push(message);
     this.messageChangeEvent.emit(this.messages.slice());
   }
}
