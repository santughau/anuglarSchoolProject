import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectModel } from '../subject.model';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {

  constructor(private router : Router, private service :SubjectService) { }

  ngOnInit(): void {
  }

}
