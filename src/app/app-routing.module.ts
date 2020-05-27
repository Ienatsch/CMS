import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

const app_Routes: Routes = [
  {path: "", redirectTo: "documents", pathMatch: "full"},
  {path: "documents", component: DocumentsComponent},
  {path: "messages", component: MessageListComponent},
  {path: "contacts", component: ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(app_Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
