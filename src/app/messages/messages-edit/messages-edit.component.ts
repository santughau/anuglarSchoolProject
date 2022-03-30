import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from '../messages.model';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.css']
})
export class MessagesEditComponent implements OnInit {
  messages: Messages = {
    messageId: '',
    messageStudentName: '',
    messageClass: '',
    messageBatch: '',
    messageImage: '',
    messageText: ''
  }
  constructor(private router : Router, private service :MessagesService) { }

  ngOnInit(): void {
  }

}
