import { Injectable, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Contact } from './contact.model';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit, OnDestroy {
  contacts: Contact[] = []
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId = 0;
  contactsListClone: Contact[];
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.contacts = this.getContacts();
    this.maxContactId = this.getMaxId();
   }

   ngOnInit() {
     this.subscription = this.contactListChangedEvent.subscribe((contactsList: Contact[]) => {
       this.contacts = contactsList;
     })
   }

   getMaxId(): number {
    var maxId = 0;

    this.contacts.forEach(contact => {
      var currentId = parseInt(contact.contactId);
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId;
  }

   getContacts(): Contact[] {
    this.http.get("https://cms-project-616fa.firebaseio.com/contacts.json").subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId()
      this.contacts.sort();
      this.contactListChangedEvent.next(this.contacts);
      // error function
      (error: any) => {
      console.log(error);
      } 
    });
    return this.contacts;
   }

   storeContacts() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json')

    this.http.put("https://cms-project-616fa.firebaseio.com/contacts.json", JSON.stringify(this.contacts), {headers: headers}).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

   getContact(contactId: string): Contact {
     return this.contacts.find(x => x.contactId === contactId ? x : null);
   }

   addContact(newContact: Contact): void {
    if (!newContact || newContact == null) {
      return;
    }

    this.maxContactId++;
    newContact.contactId = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
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
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
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
    this.storeContacts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
