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
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { Student } from '../student.model';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  fees = [];
  total_fee = 0
  student: Student = {
    studentId: '',
    studentAddress: '',
    studentClass: '',
    studentBatch: '',
    studentMedium: '',
    studentGender: '',
    studentMobile: '',
    studentEmail: '',
    studentSchool: '',
    studentFee: '',
    studentPassword: '',
    studentMac: '',
    studentDob: '',
    studentSubject: '',
    studentCompExam: '',
    studentImage: '',
    studentStatus: true,
    studentCreated: '',
  }
  studentId: any;
  croppedImage: any = '../../assets/student/8.jpg';
  constructor(    private _route: ActivatedRoute, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.studentId = this._route.snapshot.paramMap.get('id');
    this.appService.getMethod('student/read_one.php?id=' + this.studentId).subscribe((data) => {
      this.student = data.document;
      console.log(this.student);
      this.croppedImage = this.appService.serverUrl + "student/images/" + this.student.studentImage + ".jpg"
      console.log(this.croppedImage);
      this.student.studentDob = new Date();
      this.appService.hideSpinner();
    });

    this.appService.getMethod('fees/read_By_studentId.php?id=' + this.studentId).subscribe((data) => {
      this.fees = data.document;
      console.log(this.fees);
      this.findsum(this.fees)
    });
  }

  findsum(data) {
    this.total_fee = 0;
    let tvalue = data
    console.log(tvalue);
    for (let j = 0; j < data.length; j++) {
      this.total_fee += parseInt(tvalue[j].feeFeeAmt);
    }
    console.log(this.total_fee)
  }

  getDetails() {
    let link = this.appService.serverUrl + '/student/details.php?id=' + this.studentId;
    window.open(link, "_blank");
  }

}
