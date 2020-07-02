import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Message } from './message.model';
import { Subscription, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MessagesService implements OnInit {
  messageChangeEvent = new EventEmitter<Message[]>();
  messagesListClone: Message[] = [];
  messages: Message[] = [];
  maxMessageId: number = 0;
  subscription: Subscription;
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    this.messages = this.getMessages();
    this.maxMessageId = this.getMaxId();
  }

  ngOnInit() {
  }

   getMessages(): Message[] {
    this.http.get("https://cms-project-616fa.firebaseio.com/messages.json").subscribe((messages: Message[]) => {
      this.messages = messages;
      this.maxMessageId = this.getMaxId()
      this.messages.sort();
      this.messageListChangedEvent.next(this.messages);
      // error function
      (error: any) => {
      console.log(error);
      } 
    });
    return this.messages;
   }

   storeMessages() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json')

    this.http.put("https://cms-project-616fa.firebaseio.com/messages.json", JSON.stringify(this.messages), {headers: headers}).subscribe(() => {
      this.messageListChangedEvent.next(this.messages.slice());
    });
  }

   getMessage(messageId: string): Message {
    return this.messages.find(x => x.messageId === messageId ? x : null);
   }

   addMessage(message: Message) {
     this.messages.push(message);
     this.storeMessages();
   }

   getMaxId(): number {
    var maxId = 0;

    this.messages.forEach(message => {
      var currentId = parseInt(message.messageId);
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId;
  }

  deleteMessage(message: Message) {
    if (!message || message == null) {
      return;
    }

    var pos = this.messages.indexOf(message);
    if (pos < 0) {
      return;
    }

    this.messages.splice(pos, 1);
    this.messagesListClone = this.messages.slice();
    this.storeMessages();
  }
}
