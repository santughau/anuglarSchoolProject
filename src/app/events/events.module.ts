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
import { EventsService } from './events.service';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
]);



@NgModule({
  declarations: [EventsListComponent,EventsEditComponent,EventsCreateComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,SharedModulesModule,FullCalendarModule
  ],
  providers: [EventsService],
})
export class EventsModule { }
