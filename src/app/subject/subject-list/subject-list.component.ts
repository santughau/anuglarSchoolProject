import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectModel } from '../subject.model';
import { SubjectService } from '../subject.service';
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  spinner: boolean = true;
  subjectModel: SubjectModel = {
    subjectId: '',
    subjectClassId: '',
    subjectClass: '',
    subjectName: '',
  }
  constructor(private router : Router, private service :SubjectService) { }

  ngOnInit(): void {
  }

}
