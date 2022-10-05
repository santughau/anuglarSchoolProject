import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SubjectModel } from '../subject.model';
import { SubjectService } from '../subject.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  classesList:any = []
  subjectModel: SubjectModel = {
    subjectId: '',
    subjectClassId: '',
    subjectClass: '',
    subjectName: '',
  }
  constructor(private spinner: NgxSpinnerService,private router: Router, private service: SubjectService,private _route: ActivatedRoute,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.spinner.show();
    const id = this._route.snapshot.paramMap.get('id');
   
    this.service.getAllClass().subscribe((data) => {
      //console.log(data);
      this.classesList = data;
      this.spinner.hide();
    })
    this.spinner.show();
    this.service.getSingleSubject(id).subscribe((data) => {
      //console.log(data);
      this.subjectModel = data;
      this.spinner.hide();
    })
  }

  updateSubject() {
    this.service.updateSubject(this.subjectModel).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Subject Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.router.navigate(['subject/subjectList'])
      } else {
        this.toastr.error('Subject Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    })
  }

}
