import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermExamService } from '../term-exam.service';
import { Termexam } from '../termexam.model';
@Component({
  selector: 'app-termexam-edit',
  templateUrl: './termexam-edit.component.html',
  styleUrls: ['./termexam-edit.component.css']
})
export class TermexamEditComponent implements OnInit {
  spinner: boolean = true;
  termexam: Termexam = {
    termexamId: '',
    termexamClassId: '',
    termexamSubjectId: '',
    termexamName: '',
    termexamFile: ''
  }
  constructor(private router : Router, private service :TermExamService) { }

  ngOnInit(): void {
  }

}
