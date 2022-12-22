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
import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterEditComponent } from './chapter-edit/chapter-edit.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { ChapterCreateGuard } from './add-chapter/chapter-create.guard';




@NgModule({
  declarations: [ChapterEditComponent,ChapterListComponent, AddChapterComponent,],
  imports: [
    CommonModule,
    ChapterRoutingModule,DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule,SharedModulesModule
  ],
  providers: [ChapterCreateGuard],
})
export class ChapterModule { }
