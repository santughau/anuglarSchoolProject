import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';
@Component({
  selector: 'app-quiz-marks',
  templateUrl: './quiz-marks.component.html',
  styleUrls: ['./quiz-marks.component.css']
})
export class QuizMarksComponent implements OnInit {

  constructor(private router : Router, private service :QuizService) { }

  ngOnInit(): void {
  }

}
