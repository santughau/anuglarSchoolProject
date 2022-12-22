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
import { ExpencesCreateComponent } from './expences-create/expences-create.component';
import { ExpensesCreateGuard } from './expences-create/expenses-create.guard';
import { ExpencesEditComponent } from './expences-edit/expences-edit.component';
import { ExpencesListComponent } from './expences-list/expences-list.component';

const routes: Routes = [
  { path: 'expencesList', component: ExpencesListComponent },
  { path: 'expencesCreate',canDeactivate:[ExpensesCreateGuard], component: ExpencesCreateComponent },
  { path: 'expencesEdit/:id', component: ExpencesEditComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ExpencesRoutingModule { }
