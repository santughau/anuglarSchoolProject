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
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentRoutingModule } from './student-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { PresentyComponent } from './presenty/presenty.component';

import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { FormsModule } from '@angular/forms';
import { StudentCreateGuard } from './student-create/student-create.guard';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
]);




@NgModule({
  declarations: [StudentListComponent, StudentCreateComponent , StudentEditComponent, StudentDetailsComponent, PresentyComponent,],
  imports: [
    CommonModule,StudentRoutingModule,SharedModulesModule,FullCalendarModule,FormsModule,NgxBootstrapModule
  ],
  providers: [StudentCreateGuard],
})
export class StudentModule { 
}
