import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "Dalan Ienatsch";

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
  var newMessage = new Message("4", this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
  this.addMessageEvent.emit(newMessage);
  this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
