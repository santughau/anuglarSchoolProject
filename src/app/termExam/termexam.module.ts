import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermexamRoutingModule } from '../termExam/termexam-routing.module';
import { TermexamCreateComponent } from './termexam-create/termexam-create.component';
import { TermexamDetailsComponent } from './termexam-details/termexam-details.component';
import { TermexamEditComponent } from './termexam-edit/termexam-edit.component';
import { TermexamListComponent } from './termexam-list/termexam-list.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { TermExamService } from './term-exam.service';



@NgModule({
  declarations: [TermexamCreateComponent,TermexamDetailsComponent,TermexamEditComponent,TermexamListComponent],
  imports: [
    CommonModule,
    TermexamRoutingModule,PdfViewerModule,NgxBootstrapModule
  ],
  providers: [TermExamService],
})
export class TermexamModule { }
