import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message("1", "subject", "someText", "someSender"),
    new Message("2", "subject2", "someText2", "someSender2"),
    new Message("3", "subject3", "someText3", "someSender3")
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
    console.log(message);
  }
}
