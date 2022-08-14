import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SelectRequiredValidatorDirective } from 'src/app/shared/directive/select-required-validator.directive';
import { SubjectModel } from '../subject.model';
import { SubjectService } from '../subject.service';

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
  constructor(private router: Router, private service: SubjectService, private spinner: NgxSpinnerService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.record = data;
      console.log(this.record);
      this.spinner.hide();
    })
  }

  saveSubject(subjectForm: any) {
    console.log(this.subjectModel);
    this.spinner.show();
    const data = {
      'subjectClassId': this.subjectModel.subjectClassId,
      'subjectName': this.subjectModel.subjectName
    }
    subjectForm.form.reset();
    this.service.createSubject(data).subscribe((res) => {
      console.log(res);
      
      this.spinner.hide();
      this.router.navigate(['/subject/addSubject']);
    });
    this.toastr.success('Class Created Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,     
    });
  }
}
