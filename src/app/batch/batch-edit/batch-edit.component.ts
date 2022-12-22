/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Batch } from '../batch.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-batch-edit',
  templateUrl: './batch-edit.component.html',
  styleUrls: ['./batch-edit.component.css']
})
export class BatchEditComponent implements OnInit {
  @ViewChild('batchForm') public batchForm: NgForm;
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
  constructor(private router: Router,private _route: ActivatedRoute,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.batchId = this._route.snapshot.paramMap.get('id');
    console.log("batchId = " + this.batchId);    
    this.getData();
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    this.appService.getMethod('batch/read_one.php?id=' + this.batchId).subscribe((data) => {
      this.batch = data.document;
      this.classList.classId = this.batch.batchClass;
      console.log(this.batch);
      console.log(this.batch);
      this.appService.hideSpinner();
    });
  }

  getData() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.appService.hideSpinner();
    });
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
    this.appService.showSpinner();
    this.appService.postMethod('batch/update.php', data).subscribe(res => {
      if (res.status == 'success') {
        this.appService.successMsg('Batch Updated Successfully!', 'Weldone !');
        this.router.navigate(['/batch/batchList'])
      } else {
        this.appService.errorsMsg('Batch not Updated Successfully!', 'Try Again !');
      }
    });
  }

}
