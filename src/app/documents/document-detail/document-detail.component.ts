import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

export class DocumentDetailComponent implements OnInit {
  document: Document;
  
  constructor( private documentService: DocumentsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      var id = params['id'];
      this.document = this.documentService.getDocument(id);
    })
  }

}
