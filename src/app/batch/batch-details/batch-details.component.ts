import { Component, OnInit } from '@angular/core';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';
@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css']
})
export class BatchDetailsComponent implements OnInit {

  constructor(private service : BatchService) { }

  ngOnInit(): void {
  }

}
