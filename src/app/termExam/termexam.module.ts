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
import { TermexamRoutingModule } from '../termExam/termexam-routing.module';
import { TermexamCreateComponent } from './termexam-create/termexam-create.component';
import { TermexamDetailsComponent } from './termexam-details/termexam-details.component';
import { TermexamEditComponent } from './termexam-edit/termexam-edit.component';
import { TermexamListComponent } from './termexam-list/termexam-list.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';



@NgModule({
  declarations: [TermexamCreateComponent,TermexamDetailsComponent,TermexamEditComponent,TermexamListComponent],
  imports: [
    CommonModule,
    TermexamRoutingModule,PdfViewerModule,SharedModulesModule,DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule,
  ],
  providers: [],
})
export class TermexamModule { }
