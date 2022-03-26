import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private router : Router, private service :StudentService) { }

  ngOnInit(): void {
  }

}
