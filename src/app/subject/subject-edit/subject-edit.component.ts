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
import { Router,ActivatedRoute } from '@angular/router';
import { SubjectModel } from '../subject.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  @ViewChild('subjectForm') public subjectForm: NgForm;
  classesList:any = []
  subjectModel: SubjectModel = {
    subjectId: '',
    subjectClassId: '',
    subjectClass: '',
    subjectName: '',
  }
  constructor(private router: Router, private _route: ActivatedRoute,private appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    const id = this._route.snapshot.paramMap.get('id');   
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      //console.log(data);
      this.classesList = data;
      this.appService.hideSpinner();
    })
    this.appService.showSpinner();
    const url = 'subjectmodel/read_one.php?id=' + id;    
    this.appService.getMethod(url).subscribe((data) => {
      //console.log(data);
      this.subjectModel = data;
      this.appService.hideSpinner();
    });
  }

  updateSubject() {
    this.appService.postMethod('subjectmodel/update.php' ,this.subjectModel).subscribe(res => {
      if (res.status == 'success') {
        this.appService.successMsg('Subject Updated Successfully!', 'Weldone !');
        this.router.navigate(['subject/subjectList'])
      } else {
        this.appService.errorsMsg('Subject Not Updated Successfully!', 'Weldone !');
      }
    });
  }

}
