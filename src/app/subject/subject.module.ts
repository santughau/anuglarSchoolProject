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
import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
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
  providers: [],
})
export class SubjectModule { }
