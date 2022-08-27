import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
@Component({
  selector: 'app-batch-edit',
  templateUrl: './batch-edit.component.html',
  styleUrls: ['./batch-edit.component.css']
})
export class BatchEditComponent implements OnInit {
  
  allClassList: any[] = [];
  classList: ClassList = {
    className: '',
    classId: 'select',
  }

  batchId: any;
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
    new Date('2022-03-05'),
    new Date('2022-03-09')
  ];
  constructor(private router: Router,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: BatchService,private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.batchId = this._route.snapshot.paramMap.get('id');
    console.log("batchId = " + this.batchId);
    
    this.getData();
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });

    this.service.getSingleBatch(this.batchId).subscribe((data) => {      
      this.batch = data.document;
      this.classList.classId = this.batch.batchClass;
      console.log(this.batch);
      console.log(this.batch);
      this.spinner.hide();
    })
  }

  getData() {
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.spinner.hide();
    })
  }

  updateBatch() {
    const data = {
      'batchId':+this.batchId,
      'batchName':this.batch.batchName,
      'batchClass':this.classList.classId,
      'batchDuration':this.batch.batchDuration,
      'batchFee':this.batch.batchFee,
      'batchStartsFrom':this.batch.batchStartsFrom,
      'batchTime':this.batch.batchTime,
    }
    this.spinner.show();
    this.service.updateBatch(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Batch Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.router.navigate(['/batch/batchList'])
      } else {
        this.toastr.error('Batch Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    })
  }

}
