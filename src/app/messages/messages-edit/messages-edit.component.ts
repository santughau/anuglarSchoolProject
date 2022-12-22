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
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { Messages } from '../messages.model';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.css']
})
export class MessagesEditComponent implements OnInit {
  @ViewChild('messageForm') public messageForm:NgForm;
  spinner: boolean = true;
  messages: Messages = {
    messageId: '',
    messageStudentId: '',
    messageStudentName: '',
    messageClassId: '',
    messageBatchId: '',
    messageImage: '',
    messageText: ''
  }
  constructor(private router : Router, private service :MessagesService,public appService: SharedServiceService) { }

  ngOnInit(): void {
  }

}
