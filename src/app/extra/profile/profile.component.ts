import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from '../extra.service';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router : Router, private service :ExtraService) { }

  ngOnInit(): void {
  }

}
