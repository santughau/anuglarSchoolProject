import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SubjectService } from './subject.service';



@NgModule({
  declarations: [SubjectListComponent, SubjectEditComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule
  ],
  providers: [SubjectService],
})
export class SubjectModule { }
