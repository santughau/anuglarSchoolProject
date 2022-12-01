/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { EventList } from '../event.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
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
  constructor(private router : Router, private _route: ActivatedRoute,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.eventId = this._route.snapshot.paramMap.get('id');
    console.log("eventId = " + this.eventId);
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    
    this.appService.getMethod('events/read_one.php?id=' + this.eventId).subscribe((data) => {
      this.eventList = data.document;
      this.eventList.eventDate = new Date();
      console.log(this.eventList);
      this.appService.hideSpinner();
    });
  }


  
  updateEvent() {
    const data = {      
      'eventId':this.eventList.eventId,
      'eventTitle':this.eventList.eventTitle,
      'eventMessage':this.eventList.eventMessage,
      'eventcolor':this.eventList.eventcolor,
      'eventDate':this.eventList.eventDate,
    }
    this.appService.showSpinner();
    this.appService.postMethod('events/update.php', data).subscribe(res => {
      if (res.status == 'success') {
        this.appService.successMsg('Event Updated Successfully!', 'Weldone!');
        this.router.navigate(['/events/eventList'])
      } else {
        this.appService.errorsMsg('Event Not  Updated Successfully!', 'Try Again!');
      }
    });
  }
}
