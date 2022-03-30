import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';
@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
  quiz: Quiz = {
    quizId: '',
    quizClass: '',
    quizSubject: '',
    quizChapter: '',
    quizTitle: '',
    quizLink: ''
  }
  constructor(private router : Router, private service :QuizService) { }

  ngOnInit(): void {
  }

}
