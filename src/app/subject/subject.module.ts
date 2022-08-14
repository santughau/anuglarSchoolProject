import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SubjectService } from './subject.service';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';




@NgModule({
  declarations: [ SubjectListComponent, SubjectEditComponent, AddSubjectComponent,],
  imports: [
    CommonModule,DataTablesModule.forRoot(),
    SubjectRoutingModule,FormsModule,NgxBootstrapModule,SharedModulesModule
  ],
  providers: [SubjectService],
})
export class SubjectModule { }
