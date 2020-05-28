import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  @Input() contact: Contact;

  constructor( private contactService: ContactService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      var id = params['id'];
      this.contact = this.contactService.getContact(id);
    })
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl("contacts");
  }

}
