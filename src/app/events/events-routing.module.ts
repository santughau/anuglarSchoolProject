/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsCreateComponent } from './events-create/events-create.component';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { EventsListComponent } from './events-list/events-list.component';

const routes: Routes = [
  { path: 'eventList', component: EventsListComponent },
  { path: 'eventsCreate', component: EventsCreateComponent },
  { path: 'eventsEdit/:id', component: EventsEditComponent },
 
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EventsRoutingModule { }
