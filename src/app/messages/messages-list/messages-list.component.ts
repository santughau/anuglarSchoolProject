import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from '../messages.model';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  constructor(private router : Router, private service :MessagesService) { }

  ngOnInit(): void {
  }

}
