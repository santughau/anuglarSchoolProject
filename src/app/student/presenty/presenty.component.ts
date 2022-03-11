import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-presenty',
  templateUrl: './presenty.component.html',
  styleUrls: ['./presenty.component.css']
})
export class PresentyComponent implements OnInit {
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
    { title: 'Absent For Physics', date: '2022-03-03',msg:'Hello' }
  ];
  totlaevents: any = this.events.concat(this.eventadd);
  config = {
    animated: true
  };
   
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.totlaevents,
    eventClick: this.handleDateClick.bind(this), 
  };
  
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.events.forEach((e: { [x: string]: string; }) => {
      if (e["title"] == 'Present') {
        this.presentDays++;
      } else {
        this.absentDays++
      }
    });
    console.log(this.presentDays);
    console.log(this.absentDays);
  }

  handleDateClick(arg: any) {
    console.log(arg);
    console.log(arg.event._def.title);
    console.log(arg.event._def.extendedProps);
    this.start = arg.event.start;
    this.title = arg.event._def.title;
    this.modalRef = this.modalService.show(this.template, this.config);
  }


}
