import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Output() selectedContact;
  
  constructor() { }

  ngOnInit(): void {
  }

}
