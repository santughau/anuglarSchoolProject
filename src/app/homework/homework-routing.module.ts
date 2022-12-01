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
import { HomeworkCreateComponent } from './homework-create/homework-create.component';
import { HomeworkDetailsComponent } from './homework-details/homework-details.component';
import { HomeworkEditComponent } from './homework-edit/homework-edit.component';
import { HomeworkListComponent } from './homework-list/homework-list.component';

const routes: Routes = [
  { path: 'homeworkList', component: HomeworkListComponent },
  { path: 'homeworkCreate', component: HomeworkCreateComponent },
  { path: 'homeworkDetails/:id', component: HomeworkDetailsComponent },
  { path: 'homeworkEdit/:id', component: HomeworkEditComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomeworkRoutingModule { }
