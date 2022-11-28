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
import { Profile } from '../profile.model';
import { CommonServiceService } from 'src/app/common/common-service.service';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  disableBoolean: boolean = true;
  editButtonText: string = "Edit Profile";
  updateBoolean: boolean = true;
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
  someSubscription: any;
  constructor( private service: CommonServiceService,  public appService: SharedServiceService) { 
  }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.appService.getMethod('profile/read_one.php?id=1').subscribe((data) => {
      this.profile = data.document;
      this.appService.hideSpinner();
    });
  }
  editData() {    
    this.disableBoolean = !this.disableBoolean;
    if (this.disableBoolean) {
      this.editButtonText = "Edit Profile";
      this.updateBoolean = true;
    } else {
      this.editButtonText = "Restore "
      this.updateBoolean = false;
    }
  }

  updateData() {
    const data = {
      'profileId':this.profile.profileId,
      'profileInstituteName':this.profile.profileInstituteName,
      'profileAddressOne':this.profile.profileAddressOne,
      'profileAddressTwo':this.profile.profileAddressTwo,
      'profileTaluka':this.profile.profileTaluka,
      'profileDistrict':this.profile.profileDistrict,
      'profileMobile':this.profile.profileMobile,
      'profileEmail':this.profile.profileEmail,
      'profileBankName':this.profile.profileBankName,
      'profileAccNo':this.profile.profileAccNo,
      'profileIfsc':this.profile.profileIfsc,
      'profileSlogan':this.profile.profileSlogan,
      'profileWebsite':this.profile.profileWebsite,
      'profileLogo':this.profile.profileLogo,
    }
    this.appService.showSpinner();
    this.appService.postMethod('profile/update.php',data).subscribe(res => {
      //this.router.navigate([this.router.url]);
      window.location.reload();
      if (res.status == 'success') {
        this.appService.successMsg('Profile Updated Successfully!', 'Weldone !');
        this.appService.hideSpinner();
      } else {
        this.appService.errorsMsg('Profile Not Updated Successfully!', 'Try Again! !')
        this.appService.hideSpinner();
      }
    });
  }
}
