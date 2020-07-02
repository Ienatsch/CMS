import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {
  @Output() selectedDocumentEvent = new EventEmitter();
  documents: Document[] = []
  subscription: Subscription;

  constructor(private documentService: DocumentsService) {
    this.documents = documentService.documents;
   }

  ngOnInit(): void {
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentList: Document[]) => {
      this.documents = documentList;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
