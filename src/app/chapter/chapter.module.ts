import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterService } from './chapter.service';
import { ChapterEditComponent } from './chapter-edit/chapter-edit.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';




@NgModule({
  declarations: [ChapterEditComponent,ChapterListComponent, AddChapterComponent,],
  imports: [
    CommonModule,
    ChapterRoutingModule,DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule,SharedModulesModule
  ],
  providers: [ChapterService],
})
export class ChapterModule { }
