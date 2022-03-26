import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '../fee.model';
import { FeeService } from '../fee.service';
@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent implements OnInit {

  constructor(private router : Router, private service :FeeService) { }

  ngOnInit(): void {
  }

}
