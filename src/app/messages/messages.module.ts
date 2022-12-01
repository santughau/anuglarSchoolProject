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
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesEditComponent } from './messages-edit/messages-edit.component';
import { MessagesCreateComponent } from './messages-create/messages-create.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ MessagesListComponent,
    MessagesCreateComponent,
    MessagesEditComponent,],
  imports: [
    CommonModule,FormsModule,DataTablesModule.forRoot(),
    MessagesRoutingModule,EditorModule,SharedModulesModule,
  ],
  providers: [],
})
export class MessagesModule { }
