import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';


import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { EventsCreateComponent } from './events-create/events-create.component';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
]);



@NgModule({
  declarations: [EventsListComponent,EventsEditComponent,EventsCreateComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,NgxBootstrapModule,FullCalendarModule
  ]
})
export class EventsModule { }
