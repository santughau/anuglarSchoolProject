import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Homework } from '../homework.model';
import { HomeworkService } from '../homework.service';
@Component({
  selector: 'app-homework-details',
  templateUrl: './homework-details.component.html',
  styleUrls: ['./homework-details.component.css']
})
export class HomeworkDetailsComponent implements OnInit {
  spinner: boolean = true;
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
  constructor(private modalService: BsModalService, private router: Router, private service: HomeworkService) { }

  ngOnInit(): void {
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
    this.totalPages = event._pdfInfo.numPages
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
