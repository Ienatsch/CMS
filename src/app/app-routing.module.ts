import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Document } from './documents/document.model';
import { Message } from './messages/message.model';
import { Contact } from './contacts/contact.model';

const app_Routes: Routes = [
  {path: "", component: Document},
  {path: "/documents", component: Document},
  {path: "/messages", component: Message},
  {path: "/contact", component: Contact}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(app_Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
