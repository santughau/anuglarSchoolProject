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
import { TermCreateGuard } from './termexam-create/term-create.guard';
import { TermexamCreateComponent } from './termexam-create/termexam-create.component';
import { TermexamDetailsComponent } from './termexam-details/termexam-details.component';
import { TermexamEditComponent } from './termexam-edit/termexam-edit.component';
import { TermexamListComponent } from './termexam-list/termexam-list.component';

const routes: Routes = [
  { path: 'termExamList', component: TermexamListComponent },
  { path: 'termexamCreate',canDeactivate:[TermCreateGuard], component: TermexamCreateComponent },
  { path: 'termexamDetails/:id', component: TermexamDetailsComponent },
  { path: 'termexamEdit/:id', component: TermexamEditComponent, },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class TermexamRoutingModule { }
