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
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  Id: any = '';
  questions: any = '';
  optionA: any = '';
  optionB: any = '';
  optionC: any = '';
  optionD: any = '';
  answer: any = 'A';
  quizid :any = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };
  constructor(private router: Router,private _route: ActivatedRoute, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.Id = this._route.snapshot.paramMap.get('id');
    this.appService.getMethod('question/read_one.php?id=' + this.Id).subscribe((res) => {
      //this.quiz = res.document;
     // this.Id = res.document.questionId;
      this.questions = res.document.questions;
      this.optionA = res.document.optionA;
      this.optionB = res.document.optionB;
      this.optionC = res.document.optionC;
      this.optionD = res.document.optionD;
      this.answer = res.document.answer;
      this.quizid = res.document.quizId;
      
      this.appService.hideSpinner();
    });
  }

  updateQuestion() {
    console.log('Updated');    
    const data = {
      'questions': this.questions,
      'optionA': this.optionA,
      'optionB': this.optionB,
      'optionC': this.optionC,
      'optionD': this.optionD,
      'answer': this.answer,
      'questionId': this.Id,
      'quizId': this.quizid,
    }
    console.log(data);
    
    this.appService.postMethod('question/update.php', data).subscribe((res) => {
      console.log(res);
      this.appService.hideSpinner();
      this.questions = '';
      this.optionA = '';
      this.optionB = '';
      this.optionC = '';
      this.optionD = '';
      this.appService.successMsg('Question Added Successfully!', 'Weldone!');
      this.router.navigate(['/quiz/quizList'])
    });
    
  }

}
