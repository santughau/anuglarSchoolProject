/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  questions: any = []
  quizId: any = '';

  constructor(private router: Router, private service: QuizService, private spinner: NgxSpinnerService, private _route: ActivatedRoute, private toastr: ToastrService,public appService: SharedServiceService) { }

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
    
  }

  deleteQuestions(id: any) {
    
  }

}
