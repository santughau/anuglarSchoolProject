import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from '../extra.service';
import { Profile } from '../profile.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/common/common-service.service';
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
  constructor(private router: Router, private service: CommonServiceService, private spinner: NgxSpinnerService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.spinner.show();
    this.service.getProfile(1).subscribe((data) => {
      this.profile = data.document;
      this.spinner.hide();
    })
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
    this.spinner.show();
    this.service.updateProfile(data).subscribe(res => {
      //this.router.navigate([this.router.url]);
      window.location.reload();
      if (res.status == 'success') {
        this.toastr.success('Profile Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        
      } else {
        this.toastr.error('Profile Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    })
  }
}
