import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-presenty',
  templateUrl: './presenty.component.html',
  styleUrls: ['./presenty.component.css']
})
export class PresentyComponent implements OnInit {
  student: Student = {
    studentId: '',
    studentName: '',
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
  modalRef?: BsModalRef;
  start: any;
  title: any;
  presentDays: number = 0;
  absentDays: number = 0;
  msg: string = '';
  @ViewChild('template') template!: string;
  events: any = [
    { title: 'Present', date: '2022-03-01', color: '#0000FF' },
    { title: 'Absent', date: '2022-03-02', color: '#0000FF' },
    { title: 'Present', date: '2022-03-03', color: '#FF0000' },

  ];
  eventadd: any = [
    { title: 'Absent For Physics', date: '2022-03-03', msg: 'Hello' }
  ];
  //totlaevents: any = this.events.concat(this.eventadd);
  totlaevents = [];
  config = {
    animated: true
  };

  calendarOptions: CalendarOptions = {};

  constructor(private modalService: BsModalService, private router: Router, private studentService: StudentService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.studentId = this._route.snapshot.paramMap.get('id');
    this.studentService.getSingleStudent(this.studentId).subscribe((data) => {
      this.student = data.document;
      console.log(this.student);
    });

    this.studentService.getPresnety(this.studentId).subscribe((data) => {
      this.totlaevents = data.document;
      console.log(this.student);
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.totlaevents,
        eventClick: this.handleDateClick.bind(this),
      };
      this.totlaevents.forEach((e: { [x: string]: string; }) => {
        if (e["title"] == 'PRESENT') {
          this.presentDays++;
        } else {
          this.absentDays++
        }
      });
    });



    console.log(this.presentDays);
    console.log(this.absentDays);
    this.spinner.hide();
  }

  handleDateClick(arg: any) {
    console.log(arg);
    console.log(arg.event._def.title);
    console.log(arg.event._def.extendedProps);
    this.start = arg.event.start;
    this.title = arg.event._def.title;
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  printReport() {
    let link = 'http://localhost/ranjana/presnety/report.php?id=' + this.studentId;
    window.open(link, "_blank");
  }
}
