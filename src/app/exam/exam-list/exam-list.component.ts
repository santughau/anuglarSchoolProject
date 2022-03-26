import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  constructor(private router : Router, private service :ExamService) { }

  ngOnInit(): void {
  }

}
