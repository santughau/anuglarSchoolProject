import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {

  data= [
    { "icon": "fa-home", "title": "Home", "count": 0, "urlLink": "indexpage" },
    {"icon":"fa-camera", "title":"Gallery", "count":4,"urlLink":"gallery"},
    {"icon":"fa-user", "title":"Student", "count":4,"urlLink":"student"},
    {"icon":"fa-life-ring", "title":"Batches", "count":4,"urlLink":"batch"},
    
    {"icon":"fa-money", "title":"Fees", "count":4,"urlLink":"fee"},
    {"icon":"fa-sort", "title":"Category", "count":4,"urlLink":"category"}, 
    {"icon":"fa-money", "title":"Expences", "count":4,"urlLink":"expences"}, 
    {"icon":"fa-question", "title":"Exam", "count":4,"urlLink":"exam"}, 
    {"icon":"fa-envelope", "title":"Messages", "count":4,"urlLink":"messages"}, 
    
  ]
  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
       
  }

  ngAfterViewInit() {
    let div = document.querySelectorAll(".list-group a");
    div[0].classList.add("active");
  }
  addActiveClass(i:any,link:string) {
    let div = document.querySelectorAll(".list-group a");
    console.log(div);
    for (let i = 0; i < div.length; i++) {
      div[i].classList.remove("active");
    }
    div[i].classList.add("active")
    console.log(link);
    this.router.navigate([link])
    
  }
}
