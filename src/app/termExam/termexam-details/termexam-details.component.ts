import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TermExamService } from '../term-exam.service';
import { Termexam } from '../termexam.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-termexam-details',
  templateUrl: './termexam-details.component.html',
  styleUrls: ['./termexam-details.component.css']
})
export class TermexamDetailsComponent implements OnInit {
  termExamId: any;
  termexam: Termexam = {
    termexamId: '',
    termexamClassId: '',
    termexamSubjectId: '',
    termexamName: '',
    termexamFile: ''
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
  constructor(private spinner: NgxSpinnerService,private modalService: BsModalService, private router: Router, private service: TermExamService,private _route: ActivatedRoute,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.termExamId = this._route.snapshot.paramMap.get('id');
    console.log(this.termExamId);
    this.gettermExam();
  }

  gettermExam() {
    this.service.getSingleTermExam(this.termExamId).subscribe((data) => {
      this.termexam = data.document;
      console.log(this.termexam);
      const pdfFile = this.termexam.termexamFile;
      this.pdfSrc = 'http://localhost/ranjana/termexam/files/' + pdfFile + '.pdf';

    })
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
