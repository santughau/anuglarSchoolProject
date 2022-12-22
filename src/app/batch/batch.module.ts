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
import { BatchListComponent } from './batch-list/batch-list.component';
import { BatchCreateComponent } from './batch-create/batch-create.component';
import { BatchEditComponent } from './batch-edit/batch-edit.component';
import { BatchRoutingModule } from './batch-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { BatchDetailsComponent } from './batch-details/batch-details.component';
import { FormsModule } from '@angular/forms';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { BatchCreateGuard } from './batch-create/batch-create.guard';



@NgModule({
  declarations: [BatchListComponent,
    BatchCreateComponent,
    BatchEditComponent,
    BatchDetailsComponent],
  imports: [
    CommonModule,BatchRoutingModule,FormsModule,SharedModulesModule,NgxBootstrapModule
  ],
  providers: [BatchCreateGuard],
})
export class BatchModule {
  
 }
