import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassTitleService } from '../class-title.service';
import { ClassList } from '../classList.model';
@Component({
  selector: 'app-class-title-edit',
  templateUrl: './class-title-edit.component.html',
  styleUrls: ['./class-title-edit.component.css']
})
export class ClassTitleEditComponent implements OnInit {

  constructor(private router : Router, private service :ClassTitleService) { }

  ngOnInit(): void {
  }

}
