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

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
]);




@NgModule({
  declarations: [StudentListComponent, StudentCreateComponent, StudentEditComponent, StudentDetailsComponent, PresentyComponent],
  imports: [
    CommonModule,StudentRoutingModule,NgxBootstrapModule,FullCalendarModule
  ]
})
export class StudentModule { 
  
}
