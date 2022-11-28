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
import { ClassListComponent } from './class-list/class-list.component';
import { ClassTitleEditComponent } from './class-title-edit/class-title-edit.component';
import { ClassTitleComponent } from './class-title/class-title.component';

const routes: Routes = [
  { path: 'addClassList', component: ClassTitleComponent },
  { path: 'classList', component: ClassListComponent },
  
  { path: 'classEdit/:id', component: ClassTitleEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ClassTitleRoutingModule { }
