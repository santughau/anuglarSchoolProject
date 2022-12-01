/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  modalRef?: BsModalRef;
  start: any;
  title: any;
  msg: any;
  presentDays: number = 0;
  absentDays: number = 0;
  eventId: any = null;

  @ViewChild('template') template!: string;
  /* events: any = [
    { title: 'Present', date: '2022-03-01', color: '#0000FF' },
    { title: 'Absent', date: '2022-03-02', color: '#0000FF' },
    { title: 'Present', date: '2022-03-03', color: '#FF0000' },
  ];
  eventadd: any = [
    { title: 'Absent For Physics', date: '2022-03-03',msg:'Hello' }
  ];

  eventextraadd: any = [
    { title: 'Absent For ch', date: '2022-03-03',msg:'Hello' }
  ]; */
  //totlaevents: any = this.events.concat(this.eventextraadd);

  totlaevents: any = [];
  ssd: any = [];
  config = {
    animated: true
  };
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.totlaevents,
    eventClick: this.handleDateClick.bind(this),
  };
  constructor(private modalService: BsModalService, private router: Router, public appService: SharedServiceService) { }

  ngOnInit(): void {

    this.getAllEvents()
    /* this.events.forEach((e: { [x: string]: string; }) => {
      if (e["title"] == 'Present') {
        this.presentDays++;
      } else {
        this.absentDays++
      }
    }); */
    //console.log(this.presentDays);
    // console.log(this.absentDays);
  }

  handleDateClick(arg: any) {
    console.log(arg);
    console.log(arg.event._def.title);
    console.log(arg.event._def.extendedProps);
    this.start = arg.event.start;
    this.title = arg.event._def.title;
    this.msg = arg.event._def.extendedProps.msg;
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  getAllEvents() {
    this.appService.showSpinner();
    this.appService.getMethod('events/read.php').subscribe((data) => {
      // console.log(data);
      this.totlaevents = data.document;
      console.log(this.totlaevents);

    });

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        eventClick: this.handleDateClick.bind(this),
        events: this.totlaevents,
      };
    }, 2500);
    this.appService.hideSpinner();
  }


  editEvents(id: any) {
    console.log(id);
    this.router.navigate(['events/eventsEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }


  decline(): void {
    this.modalRef?.hide();
  }

  confirm(id: any): void {
    this.appService.showSpinner();
    console.log(id);
    const data = {
      'eventId': id
    }
    this.appService.postMethod('events/delete.php',data).subscribe(res => {
      if (res.status == 'success') {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Event Deleted Successfully!', 'Weldone!');
        this.modalRef?.hide();
        this.router.navigate(['/events/eventsCreate']);
      } else {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Event Batch Was not Deleted Successfully!', 'OOPs Try Again!');
        this.modalRef?.hide();
      }
      this.modalRef?.hide();
      this.router.navigate(['/events/eventsCreate'])
    });
  }
}



