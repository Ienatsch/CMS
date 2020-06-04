import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = []
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxDocumentId = 0;
  contactsListClone: Contact[];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[] {
     return this.contacts.slice();
   }

   getContact(contactId: string): Contact {
     return this.contacts.find(x => x.contactId === contactId ? x : null);
   }

   addContact(newContact: Contact): void {
    if (!newContact || newContact == null) {
      return;
    }

    this.maxDocumentId++;
    newContact.contactId = this.maxDocumentId.toString();
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();

    this.contactListChangedEvent.next(this.contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!newContact || newContact == null) {
      return;
    }

    var pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return 0;
    }

    newContact.contactId = originalContact.contactId;
    document[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (!document || document == null) {
      return;
    }

    var pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }
}
