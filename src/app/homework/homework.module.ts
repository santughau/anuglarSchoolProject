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
import { FormsModule } from '@angular/forms';
import { HomeworkRoutingModule } from './homework-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HomeworkDetailsComponent } from './homework-details/homework-details.component';
import { HomeworkCreateComponent } from './homework-create/homework-create.component';
import { HomeworkEditComponent } from './homework-edit/homework-edit.component';
import { HomeworkListComponent } from './homework-list/homework-list.component';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { HomeCreateGuard } from './homework-create/home-create.guard';



@NgModule({
  declarations: [HomeworkDetailsComponent,HomeworkCreateComponent,HomeworkEditComponent,HomeworkListComponent],
  imports: [
    CommonModule,
    HomeworkRoutingModule,PdfViewerModule,SharedModulesModule,DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule,
  ],
  providers: [HomeCreateGuard],
  

})
export class HomeworkModule { }
