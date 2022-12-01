/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Homework } from '../homework.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-homework-details',
  templateUrl: './homework-details.component.html',
  styleUrls: ['./homework-details.component.css']
})
export class HomeworkDetailsComponent implements OnInit {
  homeworkId: any;
  homework : Homework ={
    homeworkId: '',
    homeworkClassId: '',
    homeworkSubjectId: '',
    homeworkChapterId: '',
    homeworkName: '',
    homeworkFile: '',
}
  modalRef?: BsModalRef;
  pdfSrc = "https://matfuvit.github.io/UVIT/predavanja/literatura/TutorialsPoint%20JavaScript.pdf";
  zoom = 1;
  pageVariable = 1;
  totalPages!: number;
  pdfQuery = '';
  @ViewChild(PdfViewerComponent) private pdfComponent!: PdfViewerComponent;
  max = 100;
  dynamic = 0;
  loaded = 0;
  total = 0;
  @ViewChild('template1') private template1: any
  @ViewChild('template2') private template2: any
  constructor(private modalService: BsModalService, private _route: ActivatedRoute,public appService: SharedServiceService,) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.homeworkId = this._route.snapshot.paramMap.get('id');
    console.log(this.homeworkId);
    this.getHomework();
  }

  getHomework() {
    this.appService.getMethod('homework/read_one.php?id=' + this.homeworkId).subscribe((data) => {
      this.homework = data.document;
      console.log(this.homework);
      const pdfFile = this.homework.homeworkFile;
      this.pdfSrc = this.appService.serverUrl + 'homework/files/' + pdfFile + '.pdf';
    });
  }

  searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true
      });
    }
  }

  callBackFn(event: any) {
    console.log('callBackFn', event._transport._params.url);
    console.log('callBackFn', event);
    // Setting total number of pages
    this.totalPages = event._pdfInfo.numPages;
  }

  zoomOut() {
    if (this.zoom > 0.05)
      this.zoom -= 0.05;
  }

  zoomIn() {
    this.zoom += 0.05;
  }

  hundred() {
    this.zoom = 1;
  }

  pageRendered(event: any) {
    console.log('pageRendered', event.pageNumber);

  }

  pageIn() {
    if (this.pageVariable == this.totalPages) {
      this.modalRef = this.modalService.show(this.template1);
      this.pageVariable = 1;
    } else {
      this.pageVariable = this.pageVariable + 1
    }
  }

  pageOut() {
    if (this.pageVariable == 1) {

      this.modalRef = this.modalService.show(this.template2);
      this.pageVariable = 1;
    } else {
      this.pageVariable = this.pageVariable - 1
    }
  }

  last() {
    this.pageVariable = this.totalPages;
  }

  first() {
    this.pageVariable = 1;
  }


  onProgress(event: any) {
    console.log('onProgress', event);
    this.loaded = event.loaded;
    this.total = event.total;
    this.dynamic = (100 * this.loaded) / this.total;
  }
}
