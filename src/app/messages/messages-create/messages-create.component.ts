import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from '../messages.model';
import { MessagesService } from '../messages.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from 'src/app/batch/batch.model';
import { BatchService } from 'src/app/batch/batch.service';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { StudentService } from 'src/app/student/student.service';
@Component({
  selector: 'app-messages-create',
  templateUrl: './messages-create.component.html',
  styleUrls: ['./messages-create.component.css']
})
export class MessagesCreateComponent implements OnInit {
  showBatch: boolean = false;
  htmlContent: any = '';
  msgDate: any = new Date();
  allClassList: any[] = [];
  batchId: any = null;
  allBatchList: any[] = [];
  classList: ClassList = {
    className: '',
    classId: 'select',
  }
  batch: Batch = {
    batchId: 'select',
    batchName: '',
    batchClass: '',
    batchDuration: '',
    batchFee: '',
    batchStartsFrom: new Date('Aug 22 2022 08:58:02 GMT+0530'),
    batchTime: ''
  }
  bsConfig?: Partial<BsDatepickerConfig>;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };
  selectedDates: DatepickerDateTooltipText[] = [{ date: new Date('2022-03-08'), tooltipText: 'Present' },
  { date: new Date('2022-03-09'), tooltipText: 'Absent' },
  { date: new Date('2022-03-07'), tooltipText: 'Present' }
  ];

  disabledDates = [
    new Date('2022-03-05'),
    new Date('2022-03-09')
  ];
  products = [
    { id: 1, studentName: 'Elenor Anderson', isSelected: false },
    { id: 2, studentName: 'Caden Kunze', isSelected: true },
    { id: 3, studentName: 'Ms. Hortense Zulauf', isSelected: true },
    { id: 4, studentName: 'Grady Reichert', isSelected: false },
    { id: 5, studentName: 'Dejon Olson', isSelected: false },
    { id: 6, studentName: 'Jamir Pfannerstill', isSelected: false },
    { id: 7, studentName: 'Aracely Renner DVM', isSelected: false },
    { id: 8, studentName: 'Genoveva Luettgen', isSelected: false }
  ];
  presentStudent: any[] = [];
  absentStudent: any[] = [];
  studentList: any[] = [];

  constructor(private router: Router, private messageService: MessagesService, private spinner: NgxSpinnerService, private toastr: ToastrService, private batchService: BatchService, private studentService: StudentService) {

  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    this.getAllClass();
  }

  getAllClass() {
    this.spinner.show();
    this.batchService.getAllClass().subscribe((data) => {
      this.allClassList = data;
      this.spinner.hide();
    })
  }

  loadBatches(ev: any) {
    console.log(ev.target.value);
    this.batch.batchId = 'select'
    this.batchId = ev.target.value;
    this.spinner.show();
    this.batchService.getBatchWiseClass(this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      // console.log(this.allBatchList);
      this.spinner.hide();
    });
  }

  loadBatch(ev: any) {
    this.batchId = ev.target.value;
    this.getData(this.batchId);
  }

  getData(id) {
    this.spinner.show();
    this.studentService.getAllStudents(this.batchId).subscribe((data) => {
      this.studentList = data.document;
      console.log(this.studentList);

      this.studentList.forEach(x => x.checked = true);
      this.presentStudent = this.studentList.map(function (el) { return el.studentId; });
    });
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

  apply() {
    /*   this.selectedStudent = this.selectedStudent.filter((e) => {
        return e.isSelected === true;
      }).map(ele => ele.id)
      //console.log(this.checkedPro);*/

    const data = {
      'messageStudentId': this.presentStudent.join(","),
      'messageText': this.htmlContent,
      'messageDate': this.msgDate,
      'messageClassId': this.classList.classId,
      'messageBatchId': this.batch.batchId
    }
    console.log(data);
     this.messageService.createMEssage(data).subscribe((res) => {
       console.log(res);
 
       if (res.code == 1) {
         this.toastr.success('Message Created Successfully!', 'Weldone!', {
           timeOut: 3000,
           progressBar: true,
           progressAnimation: 'decreasing',
           closeButton: true,     
         });
         this.router.navigate(['/messages/messageList']);
       } 
       
       
     }); 

  }

}
