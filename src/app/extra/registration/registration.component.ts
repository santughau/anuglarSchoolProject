import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from '../extra.service';
import { Registration } from '../registrtation.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router : Router, private service :ExtraService) { }

  ngOnInit(): void {
  }

}
