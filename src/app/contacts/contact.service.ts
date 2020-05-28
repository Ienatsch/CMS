import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = []
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  
  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[] {
     return this.contacts.slice();
   }

   getContact(contactId: string): Contact {
     return this.contacts.find(x => x.contactId === contactId ? x : null);
   }

   deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
   }
}
