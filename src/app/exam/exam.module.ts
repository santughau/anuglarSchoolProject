import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { ExamDownloadCsvComponent } from './exam-download-csv/exam-download-csv.component';
import { ExamService } from './exam.service';



@NgModule({
  declarations: [
    ExamListComponent,
    ExamCreateComponent,
    ExamEditComponent,
    ExamDownloadCsvComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule, NgxBootstrapModule
  ],
  providers: [ExamService],
})
export class ExamModule { }
