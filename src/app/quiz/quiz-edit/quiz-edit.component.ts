import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz.model';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {
  spinner: boolean = true;
  quiz: Quiz = {
    quizId: '',
    quizClassId: '',
    quizSubjectId: '',
    quizChapterId: '',
    quizTitle: '',
    quizLink: ''
  }
  constructor(private router : Router, private service :QuizService) { }

  ngOnInit(): void {
  }

}
