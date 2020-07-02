import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term): any {
    let filteredContacts = [];
    if (!term) {
      return contacts;
    }

    filteredContacts = contacts.filter((contact: any) => {
      return contact.name.toLowerCase().includes(term.toLowerCase());
    })

    if (filteredContacts.length < 1) {
      return contacts;
    }

    return filteredContacts;
  }

}
