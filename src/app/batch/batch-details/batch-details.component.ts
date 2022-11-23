import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/student/student.service';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css']
})
export class BatchDetailsComponent implements OnInit {
  batchId: any;
  studentList: any[] = [];
  presentStudent: any[] = [];
  absentStudent: any[] = [];
  bsConfig?: Partial<BsDatepickerConfig>;
  today = new Date()
  selectedDates: DatepickerDateTooltipText[] = [{ date: new Date('2022-03-08'), tooltipText: 'Present' },
  { date: new Date('2022-03-09'), tooltipText: 'Absent' },
  { date: new Date('2022-03-07'), tooltipText: 'Present' }
  ];

  disabledDates = [
    new Date('2022-03-05'),
    new Date('2022-03-09')
  ];

  selectedDate: any = '';



  constructor(private service: BatchService, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService, private _route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.batchId = this._route.snapshot.paramMap.get('id');
    console.log("batchId = " + this.batchId);
    this.studentService.getAllStudents(this.batchId).subscribe((data) => {
      this.studentList = data.document;
      console.log(this.studentList);
      
      this.studentList.forEach(x => x.checked = true);
      this.presentStudent = this.studentList.map(function (el) { return el.studentId; });
      this.spinner.hide();
    });
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });

  }



  checkAllCheckBox(ev: any) {
    this.studentList.forEach(x => x.checked = ev.target.checked);
    if (ev.target.checked == true) {
      this.presentStudent = this.studentList.map(function (el) { return el.studentId; });
      console.log(this.presentStudent);
      while (this.absentStudent.length > 0) {
        this.absentStudent.pop();
      }
      console.log(this.absentStudent);
    } else {
      while (this.presentStudent.length > 0) {
        this.presentStudent.pop();
      }
      this.absentStudent = this.studentList.map(function (el) { return el.studentId; });
      console.log(this.absentStudent);
      console.log(this.presentStudent);
    }
  }

  checkCheckBox(ev: any, id) {
    console.log(ev.target.checked);
    console.log(id);
    if (ev.target.checked == true) {
      this.presentStudent.push(id);
      let ele = this.absentStudent.indexOf(id);
      this.absentStudent.splice(ele, 1);
      console.log(this.absentStudent);
      console.log(this.presentStudent);
    } else {
      let ele = this.presentStudent.indexOf(id);
      this.presentStudent.splice(ele, 1);
      this.absentStudent.push(id);
      console.log(this.absentStudent);
      console.log(this.presentStudent);
    }
  }

  isAllCheckBoxChecked() {
    return this.studentList.every(p => p.checked);
  }



  updateData() {
    const data = {
      'presentStudents': this.presentStudent.join(","),
      'absentStudents': this.absentStudent.join(","),
      'date': this.selectedDate,
    }

    console.log(data);

    this.service.updateAttendance(data).subscribe((res) => {
      this.toastr.success('Attendance Uploaded Successfully!', 'Weldone!', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
      });
      this.router.navigate(['/batch/batchList']);
    });
  }
}
