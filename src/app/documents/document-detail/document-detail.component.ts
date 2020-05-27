import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { WinRefService } from 'src/app/services/win-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;

  constructor( private activatedRoute: ActivatedRoute, private documentService: DocumentsService, winRefService: WinRefService) { 
    this.nativeWindow = winRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      var id = params['id'];
      this.document = this.documentService.getDocument(id);
    })
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

}
