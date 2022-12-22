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
import { RouterModule, Routes } from '@angular/router';
import { FeeCreateComponent } from './fee-create/fee-create.component';
import { FeeCreateGuard } from './fee-create/fee-create.guard';
import { FeeEditComponent } from './fee-edit/fee-edit.component';
import { FeeListComponent } from './fee-list/fee-list.component';

const routes: Routes = [
  { path: 'feeList', component: FeeListComponent },
  { path: 'feeCreate',canDeactivate:[FeeCreateGuard], component: FeeCreateComponent },
  { path: 'feeEdit/:id', component: FeeEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
