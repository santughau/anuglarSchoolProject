import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';



@NgModule({
  declarations: [
    ExamListComponent,
    ExamCreateComponent,
    ExamEditComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule
  ]
})
export class ExamModule { }
