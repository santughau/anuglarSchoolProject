import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamDownloadCsvComponent } from './exam-download-csv/exam-download-csv.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamUploadComponent } from './exam-upload/exam-upload.component';

const routes: Routes = [
  { path: 'examList', component: ExamListComponent },
  { path: 'examCreate', component: ExamCreateComponent },
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
