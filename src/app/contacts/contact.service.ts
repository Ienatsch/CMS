import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = []
  contactSelectedEvent = new EventEmitter<Contact>();
  
  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[] {
     return this.contacts.slice();
   }

   getContact(contactId: string): Contact {
     return this.contacts.find(x => x.contactId === contactId ? x : null);
   }
}