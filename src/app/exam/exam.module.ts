import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { ExamDownloadCsvComponent } from './exam-download-csv/exam-download-csv.component';
import { ExamService } from './exam.service';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    ExamListComponent,
    ExamCreateComponent,
    ExamEditComponent,
    ExamDownloadCsvComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule, DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule,SharedModulesModule
  ],
  providers: [ExamService],
})
export class ExamModule { }
