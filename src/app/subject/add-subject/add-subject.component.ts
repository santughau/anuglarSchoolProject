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
import { Router } from '@angular/router';
import { SelectRequiredValidatorDirective } from 'src/app/shared/directive/select-required-validator.directive';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { SubjectModel } from '../subject.model';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  subjectModel: SubjectModel = {
    subjectId: '',
    subjectClassId: 'select',
    subjectClass: '',
    subjectName: '',
  }
  record: any[] = [];
  constructor(private router: Router, private appService: SharedServiceService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.record = data;
      //console.log(this.record);
      this.appService.hideSpinner();
    });
  }

  saveSubject(subjectForm: any) {
    // console.log(this.subjectModel);
    this.appService.showSpinner();
    const data = {
      'subjectClassId': this.subjectModel.subjectClassId,
      'subjectName': this.subjectModel.subjectName
    }
    subjectForm.form.reset();
    this.appService.postMethod('subjectmodel/create.php', data).subscribe((res) => {
      //console.log(res);      
      this.appService.hideSpinner();
      this.router.navigate(['/subject/subjectList']);
    });
    this.appService.successMsg('Subject Created Successfully!', 'Weldone !');

  }
}
