import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { EventList } from '../event.model';
import { EventsService } from '../events.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit {
  eventId: any;
  eventList : EventList = {
    eventId: '',
    eventTitle: '',
    eventMessage: '',
    eventcolor: '',
    eventDate: '',
  }
  colors: any = ['#0078AA', '#E70B89', '#6574CF', '#F02640', '#5cb85c', '#Ff5e43', '#3498db', '#ce1212', '#218c74', '#E80F88'];
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
  constructor(private router : Router, private service :EventsService,private spinner: NgxSpinnerService, private toastr: ToastrService,private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.eventId = this._route.snapshot.paramMap.get('id');
    console.log("eventId = " + this.eventId);
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    
    this.service.getSingleEvent(this.eventId).subscribe((data) => {      
      this.eventList = data.document;
      this.eventList.eventDate = new Date();
      console.log(this.eventList);
      this.spinner.hide();
    })
  }


  
  updateEvent() {
    const data = {      
      'eventId':this.eventList.eventId,
      'eventTitle':this.eventList.eventTitle,
      'eventMessage':this.eventList.eventMessage,
      'eventcolor':this.eventList.eventcolor,
      'eventDate':this.eventList.eventDate,
    }
    this.spinner.show();
    this.service.updateEvent(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Event Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.router.navigate(['/events/eventList'])
      } else {
        this.toastr.error('Event Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    })
  }

}
