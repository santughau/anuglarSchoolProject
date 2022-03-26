import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermExamService } from '../term-exam.service';
import { Termexam } from '../termexam.model';
@Component({
  selector: 'app-termexam-list',
  templateUrl: './termexam-list.component.html',
  styleUrls: ['./termexam-list.component.css']
})
export class TermexamListComponent implements OnInit {

  constructor(private router : Router, private service :TermExamService) { }

  ngOnInit(): void {
  }

}
