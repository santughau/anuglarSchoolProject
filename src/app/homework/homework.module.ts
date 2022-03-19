import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeworkRoutingModule } from './homework-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HomeworkDetailsComponent } from './homework-details/homework-details.component';
import { HomeworkCreateComponent } from './homework-create/homework-create.component';
import { HomeworkEditComponent } from './homework-edit/homework-edit.component';
import { HomeworkListComponent } from './homework-list/homework-list.component';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';


@NgModule({
  declarations: [HomeworkDetailsComponent,HomeworkCreateComponent,HomeworkEditComponent,HomeworkListComponent],
  imports: [
    CommonModule,
    HomeworkRoutingModule,PdfViewerModule,NgxBootstrapModule
  ]
  

})
export class HomeworkModule { }
