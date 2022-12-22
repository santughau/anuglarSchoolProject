/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  questions: any = []
  quizId: any = '';
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private router: Router, private service: QuizService, private spinner: NgxSpinnerService, private _route: ActivatedRoute, private toastr: ToastrService, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.quizId = this._route.snapshot.paramMap.get('id');
    this.spinner.hide();
    this.appService.getMethod('question/read.php?id=' + this.quizId).subscribe((data) => {
      this.questions = data.document;
      console.log(this.questions);
      this.appService.hideSpinner();
    });
  }

  editQuestions(id: any) {
    console.log(id);
    this.router.navigate(['quiz/questionEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    console.log(template);
    
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(id: any): void {
    this.appService.showSpinner();
    console.log(id);
    const data = {
      'questionsId': id
    }
    this.appService.postMethod('question/delete.php', data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.appService.hideSpinner();
        this.appService.successMsg('Question Deleted Successfully!', 'Weldone !');
        this.modalRef?.hide();
      } else {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Sorry Question Was not Deleted Successfully!', 'OOPs Try Again!');
        this.modalRef?.hide();
      }
      this.modalRef?.hide();
      this.router.navigate(['/quiz/quizList'])
    });
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
