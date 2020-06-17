import { Injectable, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService implements OnInit, OnDestroy {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  documentsListClone: Document[];
  subscription: Subscription;
  

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  ngOnInit() {
    this.subscription = this.documentListChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
    });
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(documentId: string) {
    return this.documents.find(x => x.documentId === documentId ? x : null);
  }

  getMaxId(): number {
    var maxId = 0;

    this.documents.forEach(document => {
      var currentId = parseInt(document.documentId);
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId;
  }

  addDocument(newDocument: Document): void {
    if (!newDocument || newDocument == null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.documentId = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentsListClone = this.documents.slice();

    this.documentListChangedEvent.next(this.documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!newDocument || newDocument == null) {
      return;
    }

    var pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return 0;
    }

    newDocument.documentId = originalDocument.documentId;
    this.documents[pos] = newDocument;
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document || document == null) {
      return;
    }

    var pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
