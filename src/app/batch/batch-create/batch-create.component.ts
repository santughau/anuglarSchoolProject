import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';


@Component({
  selector: 'app-batch-create',
  templateUrl: './batch-create.component.html',
  styleUrls: ['./batch-create.component.css']
})
export class BatchCreateComponent implements OnInit {
  allClassList: any[] = [];
  classList: ClassList = {
    className: '',
    classId: 'select',
  }
  batch: Batch = {
    batchId: '',
    batchName: '',
    batchClass: '',
    batchDuration: '',
    batchFee: '',
    batchStartsFrom: new Date('Aug 22 2022 08:58:02 GMT+0530'),
    batchTime: ''
  }


  bsConfig?: Partial<BsDatepickerConfig>;

  today = new Date()
  selectedDates: DatepickerDateTooltipText[] = [{ date: new Date('2022-08-08'), tooltipText: '8th of August' },
  { date: new Date('2022-08-09'), tooltipText: '9th of August' },
  { date: new Date('2022-08-07'), tooltipText: '7th of August' }
  ];

  disabledDates = [
    new Date('2022-08-05'),
    new Date('2022-08-09')
  ];
  constructor(private router: Router,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: BatchService,) { }

  ngOnInit(): void { 
    
    this.getData();
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
  }
  saveBatch() {
    this.batch.batchClass = this.classList.classId!
    this.service.createBatch(this.batch).subscribe((res) => {
      this.toastr.success('Batch Created Successfully!', 'Weldone!', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,     
      });
      this.router.navigate(['/batch/batchList']);
    });
  }

  getData() {
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.spinner.hide();
    })
  }
}
