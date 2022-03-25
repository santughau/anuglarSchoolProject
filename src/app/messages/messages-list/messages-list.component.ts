import { Component, OnInit } from '@angular/core';
import { Messages } from '../messages.model';
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
