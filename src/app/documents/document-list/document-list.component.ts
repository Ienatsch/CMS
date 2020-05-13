import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter();

  constructor() { }

  documents: Document[] = [
    new Document("1", "Doc1", "Doc1 Description", "Doc1 Url", null),
    new Document("2", "Doc2", "Doc2 Description", "Doc2 Url", null),
    new Document("3", "Doc3", "Doc3 Description", "Doc3 Url", null),
    new Document("4", "Doc4", "Doc4 Description", "Doc4 Url", null),
    new Document("5", "Doc5", "Doc5 Description", "Doc5 Url", null),
  ];

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
