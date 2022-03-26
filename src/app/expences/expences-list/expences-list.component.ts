import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expences } from '../expences.model';
import { ExpencesService } from '../expences.service';
@Component({
  selector: 'app-expences-list',
  templateUrl: './expences-list.component.html',
  styleUrls: ['./expences-list.component.css']
})
export class ExpencesListComponent implements OnInit {

  constructor(private router : Router, private service :ExpencesService) { }

  ngOnInit(): void {
  }

}
