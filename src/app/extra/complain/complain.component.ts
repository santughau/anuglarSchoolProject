import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Complaint } from '../complaints.model';
import { ExtraService } from '../extra.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {
  spinner: boolean = true;
  constructor(private router : Router, private service :ExtraService) { }

  ngOnInit(): void {
  }

}
