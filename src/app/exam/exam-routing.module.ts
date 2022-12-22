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
import { RouterModule, Routes } from '@angular/router';
import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamCreateGuard } from './exam-create/exam-create.guard';
import { ExamDownloadCsvComponent } from './exam-download-csv/exam-download-csv.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamUploadComponent } from './exam-upload/exam-upload.component';

const routes: Routes = [
  { path: 'examList', component: ExamListComponent },
  { path: 'examCreate', canDeactivate:[ExamCreateGuard], component: ExamCreateComponent },
  { path: 'examEdit/:id', component: ExamEditComponent },
  { path: 'examDownload/:id', component: ExamDownloadCsvComponent },
  { path: 'examUplaod/:id/:batch', component: ExamUploadComponent }
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ExamRoutingModule { }
