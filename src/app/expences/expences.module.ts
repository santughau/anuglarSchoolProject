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
import { ExpencesListComponent } from './expences-list/expences-list.component';
import { ExpencesCreateComponent } from './expences-create/expences-create.component';
import { ExpencesEditComponent } from './expences-edit/expences-edit.component';
import { ExpencesRoutingModule } from './expences-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExpencesListComponent,
    ExpencesCreateComponent,
    ExpencesEditComponent,],
  imports: [
    CommonModule,
    ExpencesRoutingModule,SharedModulesModule,FormsModule,NgxBootstrapModule
  ],
  providers: [],
})
export class ExpencesModule {
}
