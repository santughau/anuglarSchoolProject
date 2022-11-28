
/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from '../extra.service';
import { Registration } from '../registrtation.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  spinner: boolean = true;
  constructor(private router : Router, private service :ExtraService) { }

  ngOnInit(): void {
  }

}
