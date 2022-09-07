import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Expences } from '../expences.model';
import { ExpencesService } from '../expences.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expences-edit',
  templateUrl: './expences-edit.component.html',
  styleUrls: ['./expences-edit.component.css']
})
export class ExpencesEditComponent implements OnInit {
  expencesId: any;
  expences: Expences = {
    expencesId: '',
    expencesParticular: '',
    expencesAmt: '',
    expencesDate: ''
  }
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
  constructor(private router : Router, private service :ExpencesService,private _route: ActivatedRoute,private spinner: NgxSpinnerService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.expencesId = this._route.snapshot.paramMap.get('id');
    console.log("expencesId = " + this.expencesId);
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });

    this.service.getSingleExpense(this.expencesId).subscribe((data) => {      
      this.expences = data.document;
      console.log(this.expences);
      this.spinner.hide();
    })
  }

  updateExpense(){
    console.log(this.expences);
    this.spinner.show();
    this.service.updateExpense(this.expences).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Expense Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.router.navigate(['/expences/expencesList'])
      } else {
        this.toastr.error('Expense Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    })
  }

}
