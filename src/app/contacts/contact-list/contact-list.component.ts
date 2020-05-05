import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  
  contacts: Contact[] = [
    new Contact('1', 'Bart Simmons', 'bartS@gmail.com', "888-777-6666", "/assets/bartSimmons.jpg", null),
    new Contact('2', 'Charles Barkley', 'cBarkley@gmail.com', "765-445-3434", "/assets/charlesBarkley.jpg", null)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }
}
