import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';
@Component({
  selector: 'app-exam-download-csv',
  templateUrl: './exam-download-csv.component.html',
  styleUrls: ['./exam-download-csv.component.css']
})
export class ExamDownloadCsvComponent implements OnInit {

  constructor(private router : Router, private service :ExamService) { }

  ngOnInit(): void {
  }

}
