import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';
@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
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
