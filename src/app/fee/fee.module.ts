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
import { FeeListComponent } from './fee-list/fee-list.component';
import { FeeCreateComponent } from './fee-create/fee-create.component';
import { FeeEditComponent } from './fee-edit/fee-edit.component';
import { FeeRoutingModule } from './fee-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { FeeService } from './fee.service';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FeeListComponent,
    FeeCreateComponent,
    FeeEditComponent,],
  imports: [
    CommonModule,FeeRoutingModule,SharedModulesModule,FormsModule,NgxBootstrapModule
  ],
  providers: [FeeService],
})
export class FeeModule { }
