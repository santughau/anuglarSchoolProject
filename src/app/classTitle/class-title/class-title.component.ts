import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassTitleService } from '../class-title.service';
import { ClassList } from '../classList.model';

@Component({
  selector: 'app-class-title',
  templateUrl: './class-title.component.html',
  styleUrls: ['./class-title.component.css']
})
export class ClassTitleComponent implements OnInit {

  constructor(private router : Router, private service :ClassTitleService) { }

  ngOnInit(): void {
  }

}
