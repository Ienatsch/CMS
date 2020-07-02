import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private documentService: DocumentsService, winRefService: WinRefService) { 
    this.nativeWindow = winRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      var id = params['id'];
      this.document = this.documentService.getDocument(id);
    })
    if (this.documentService.documents.length < 1) {
      this.router.navigateByUrl("documents");
    }
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl("documents");
  }

}
