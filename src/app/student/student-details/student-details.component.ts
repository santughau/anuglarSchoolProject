import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  
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
  constructor(private router : Router, private studentService :StudentService,private spinner: NgxSpinnerService, private toastr: ToastrService,private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.studentId = this._route.snapshot.paramMap.get('id');

    this.studentService.getSingleStudent(this.studentId).subscribe((data) => {      
      this.student = data.document;
      console.log(this.student);
      
      this.croppedImage = "http://localhost/ranjana/student/images/" + this.student.studentImage + ".jpg"
      console.log(this.croppedImage);
      this.student.studentDob = new Date();    
      this.spinner.hide();
    })

  }

  getDetails() {
    let link='http://localhost/ranjana/student/details.php?id=' + this.studentId;
  window.open(link,"_blank");
  }

}
