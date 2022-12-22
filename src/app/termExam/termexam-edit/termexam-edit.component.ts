/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { TermExamService } from '../term-exam.service';
import { Termexam } from '../termexam.model';
@Component({
  selector: 'app-termexam-edit',
  templateUrl: './termexam-edit.component.html',
  styleUrls: ['./termexam-edit.component.css']
})
export class TermexamEditComponent implements OnInit {
  @ViewChild('termexams') public termexams: NgForm;
  spinner: boolean = true;
  termexam: Termexam = {
    termexamId: '',
    termexamClassId: '',
    termexamSubjectId: '',
    termexamName: '',
    termexamFile: ''
  }
  constructor(private router: Router, public appService: SharedServiceService) { }

  ngOnInit(): void {
  }

}
