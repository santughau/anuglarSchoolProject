import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Homework } from '../homework.model';
import { HomeworkService } from '../homework.service';

@Component({
  selector: 'app-homework-create',
  templateUrl: './homework-create.component.html',
  styleUrls: ['./homework-create.component.css']
})
export class HomeworkCreateComponent implements OnInit {
  spinner: boolean = true;
  homework : Homework ={
    homeworkId: '',
    homeworkClassId: '',
    homeworkSubjectId: '',
    homeworkChapterId: '',
    homeworkName: '',
    homeworkFile: '',
}
  constructor(private router : Router, private service :HomeworkService) { }

  ngOnInit(): void {
  }

}
