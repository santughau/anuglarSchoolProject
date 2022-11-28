/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  profile: any;
  year = new Date().getFullYear()
  constructor(public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.appService.getMethod('profile/read_one.php?id=1').subscribe((data) => {
      this.profile = data.document;
      this.appService.hideSpinner();
    });
  }

}
