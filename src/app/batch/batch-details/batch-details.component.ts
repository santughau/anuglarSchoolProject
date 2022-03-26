import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';
@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css']
})
export class BatchDetailsComponent implements OnInit {

  constructor(private service : BatchService, private router : Router) { }

  ngOnInit(): void {
  }

}
