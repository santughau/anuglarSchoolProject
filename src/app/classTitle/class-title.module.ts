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
import { ClassTitleRoutingModule } from './class-title-routing.module';
import { ClassTitleComponent } from './class-title/class-title.component';
import { ClassTitleEditComponent } from './class-title-edit/class-title-edit.component';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { DataTablesModule } from 'angular-datatables';
import { ClassListComponent } from './class-list/class-list.component';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';





@NgModule({
    declarations: [ClassTitleComponent, ClassTitleEditComponent, ClassListComponent,],
    providers: [],
    imports: [
        CommonModule, DataTablesModule.forRoot(),
        ClassTitleRoutingModule, FormsModule, SharedModulesModule,
    ]
})
export class ClassTitleModule { }
