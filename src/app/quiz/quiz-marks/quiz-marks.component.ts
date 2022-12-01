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
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';
@Component({
  selector: 'app-quiz-marks',
  templateUrl: './quiz-marks.component.html',
  styleUrls: ['./quiz-marks.component.css']
})
export class QuizMarksComponent implements OnInit {
  spinner: boolean = true;
  constructor(private router : Router, private service :QuizService,public appService: SharedServiceService) { }

  ngOnInit(): void {
  }

}
