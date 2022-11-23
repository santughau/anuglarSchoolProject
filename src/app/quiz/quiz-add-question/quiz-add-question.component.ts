import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
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
  constructor(private router: Router, private service: QuizService, private spinner: NgxSpinnerService, private _route: ActivatedRoute, private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.quizId = this._route.snapshot.paramMap.get('id');
    this.spinner.hide();
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

    this.service.createQuestions(data).subscribe((res) => {
      console.log(res);

      this.spinner.hide();
      this.question = '';
      this.optionA = '';
      this.optionB = '';
      this.optionC = '';
      this.optionD = '';
    });
    this.toastr.success('Question Added Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
  }

}
