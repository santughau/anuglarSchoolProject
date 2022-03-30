import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermExamService } from '../term-exam.service';
import { Termexam } from '../termexam.model';

@Component({
  selector: 'app-termexam-create',
  templateUrl: './termexam-create.component.html',
  styleUrls: ['./termexam-create.component.css']
})
export class TermexamCreateComponent implements OnInit {
  termexam: Termexam = {
    termexamId: '',
    termexamClass: '',
    termexamSubject: '',
    termexamExam: '',
    termexamName: '',
    termexamFile: ''
  }
  constructor(private router: Router, private service: TermExamService) { }

  ngOnInit(): void {
  }

}
