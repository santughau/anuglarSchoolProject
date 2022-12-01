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
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { EventList } from '../event.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';


@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.css']
})
export class EventsCreateComponent implements OnInit {
  colors: any = ['#0078AA', '#E70B89', '#6574CF', '#F02640', '#5cb85c', '#Ff5e43', '#3498db', '#ce1212', '#218c74', '#E80F88'];
  eventList : EventList = {
    eventId: '',
    eventTitle: '',
    eventMessage: '',
    eventcolor: '',
    eventDate: new Date('Aug 22 2022 08:58:02 GMT+0530'),
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


  constructor(private router: Router, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
  }


  addEvent() {    
    const data = {
      'eventTitle': this.eventList.eventTitle,
      'eventMessage': this.eventList.eventMessage,
      'eventcolor': this.eventList.eventcolor,
      'eventDate': this.eventList.eventDate,
    }
    
    console.log(data);    
    this.appService.postMethod('events/create.php',data).subscribe((res) => {
      this.appService.successMsg('Events Created Successfully!', 'Weldone!');
      this.router.navigate(['/events/eventList']);
    });
  }
}
