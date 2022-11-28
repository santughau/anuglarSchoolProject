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
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { ClassList } from '../classList.model';
@Component({
  selector: 'app-class-title-edit',
  templateUrl: './class-title-edit.component.html',
  styleUrls: ['./class-title-edit.component.css']
})
export class ClassTitleEditComponent implements OnInit {

  classList: ClassList = {
    classId: '',
    className: ''
  }
  constructor( private router: Router,  private _route: ActivatedRoute,  private appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    const id = this._route.snapshot.paramMap.get('id');
    this.appService.getMethod('classlist/read_one.php?id=' + id).subscribe((data) => {
      //console.log(data);
      this.classList = data
      console.log(this.classList);
      this.appService.hideSpinner();
    });

  }
  updateClass() {
    this.appService.showSpinner();
    console.log(this.classList);
    this.appService.postMethod('classlist/update.php', this.classList).subscribe((res) => {
      this.appService.hideSpinner();
      this.router.navigate(['/class/classList'])
    });
    this.appService.successMsg('Class Updated Successfully!', 'Weldone !');
  }
}
