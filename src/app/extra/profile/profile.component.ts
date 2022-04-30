import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from '../extra.service';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  spinner: boolean = true;
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
  constructor(private router: Router, private service: ExtraService) { }

  ngOnInit(): void {
  }

}
