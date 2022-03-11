import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsCreateComponent } from './events-create/events-create.component';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { EventsListComponent } from './events-list/events-list.component';

const routes: Routes = [
  { path: '', component: EventsListComponent },
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
