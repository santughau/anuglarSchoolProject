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
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-quiz-add-question',
  templateUrl: './quiz-add-question.component.html',
  styleUrls: ['./quiz-add-question.component.css']
})
export class QuizAddQuestionComponent implements OnInit {
  quizId: any = '';
  question: any = '';
  optionA: any = '';
  optionB: any = '';
  optionC: any = '';
  optionD: any = '';
  answer: any = 'A';
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
  constructor(private _route: ActivatedRoute, public appService: SharedServiceService) {
  }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.quizId = this._route.snapshot.paramMap.get('id');
    this.appService.hideSpinner();
  }

  addQuestion() {
    const data = {
      'questions': this.question,
      'optionA': this.optionA,
      'optionB': this.optionB,
      'optionC': this.optionC,
      'optionD': this.optionD,
      'answer': this.answer,
      'quizId': this.quizId,
    }

    this.appService.postMethod('question/create.php',data).subscribe((res) => {
      console.log(res);

      this.appService.hideSpinner();
      this.question = '';
      this.optionA = '';
      this.optionB = '';
      this.optionC = '';
      this.optionD = '';
    });
    this.appService.successMsg('Question Added Successfully!', 'Weldone!');
  }

}
