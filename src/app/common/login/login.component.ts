import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/extra/profile.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profile: Profile = {
    profileId: '',
    profileInstituteName: '',
    profileAddressOne: '',
    profileAddressTwo: '',
    profileTaluka: '',
    profileDistrict: '',
    profileMobile: '',
    profileEmail: '',
    profileBankName: '',
    profileAccNo: '',
    profileIfsc: '',
    profileSlogan: '',
    profileWebsite: '',
    profileLogo: ''
  }
  user = {
    email: 'santosh',
    password: '00000000'
  }
  constructor(private router: Router, public appService: SharedServiceService,) {
  }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.appService.getMethod('profile/read_one.php?id=1').subscribe((data) => {
      this.profile = data.document;
      console.log(this.profile);
      this.appService.hideSpinner();
      if (this.appService.isLoggedIn()) {
        this.router.navigate(['indexpage'])
      } else {
        this.router.navigate(['login'])
      } 
      this.appService.hideSpinner();
    });
  }

  login() {
    console.log(this.user);
    this.appService.postMethod('token/generate.php', this.user).subscribe((res) => {
      console.log(res);
      if (res.code == 1) {
        localStorage.setItem("token", res.document.access_token);
      }
      console.log(res.document.access_token);
      console.log(localStorage.getItem('token'));
      if (this.appService.isLoggedIn()) {
        this.router.navigate(['indexpage'])
      } else {
        this.router.navigate(['login'])
      }
    });
    
  }
  }
