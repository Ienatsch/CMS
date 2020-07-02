import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "7";

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    var newMessage = new Message(this.messageService.maxMessageId.toString(), this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
    this.messageService.addMessage(newMessage)
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
