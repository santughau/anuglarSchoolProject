/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { ClassList } from '../classList.model';


@Component({
  selector: 'app-class-title',
  templateUrl: './class-title.component.html',
  styleUrls: ['./class-title.component.css']
})
export class ClassTitleComponent implements OnInit {
@ViewChild('classForm') public classForm:NgForm;
  classList: ClassList = {
    className: ''
  }
  constructor(private router: Router, private appService: SharedServiceService) { }

  ngOnInit(): void {

  }
  saveClass(classForm: any) {
    this.appService.showSpinner();
    const data = {
      'className': this.classList.className
    }
    classForm.form.reset();
    this.appService.postMethod('classlist/create.php', data).subscribe((res) => {
      this.appService.hideSpinner();
      this.router.navigate(['/class/classList']);
      this.appService.successMsg('You have Create an New Class', 'Weldone !');
    });

  }
}
