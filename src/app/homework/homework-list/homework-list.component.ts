import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Homework } from '../homework.model';
import { HomeworkService } from '../homework.service';
@Component({
  selector: 'app-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.css']
})
export class HomeworkListComponent implements OnInit {

  constructor(private router : Router, private service :HomeworkService) { }

  ngOnInit(): void {
  }

}
