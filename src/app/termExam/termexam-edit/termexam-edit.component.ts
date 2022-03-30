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
  termexam: Termexam = {
    termexamId: '',
    termexamClass: '',
    termexamSubject: '',
    termexamExam: '',
    termexamName: '',
    termexamFile: ''
  }
  constructor(private router : Router, private service :TermExamService) { }

  ngOnInit(): void {
  }

}
