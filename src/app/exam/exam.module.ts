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
import { ExamRoutingModule } from './exam-routing.module';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { ExamDownloadCsvComponent } from './exam-download-csv/exam-download-csv.component';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ExamUploadComponent } from './exam-upload/exam-upload.component';



@NgModule({
  declarations: [
    ExamListComponent,
    ExamCreateComponent,
    ExamEditComponent,
    ExamDownloadCsvComponent,
    ExamUploadComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule, DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule,SharedModulesModule
  ],
  providers: [],
})
export class ExamModule { }
