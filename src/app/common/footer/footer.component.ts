import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  profile: any;
  year = new Date().getFullYear()
  constructor(private service : CommonServiceService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.getProfile(1).subscribe((data) => {
      this.profile = data.document;      
      this.spinner.hide();
    })
  }

}
