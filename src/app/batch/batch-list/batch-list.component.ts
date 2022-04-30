import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';
@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {
  
  spinner: boolean = true;
  constructor(private service : BatchService,private router : Router) { }

  ngOnInit(): void {
  }

}
