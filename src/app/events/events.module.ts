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
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { FormsModule } from '@angular/forms';
import { EventCreateGuard } from './events-create/event-create.guard';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
]);



@NgModule({
  declarations: [EventsListComponent,EventsEditComponent,EventsCreateComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,SharedModulesModule,FullCalendarModule,DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule
  ],
  providers: [EventCreateGuard],
})
export class EventsModule { }
