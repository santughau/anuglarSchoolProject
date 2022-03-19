import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeworkCreateComponent } from './homework-create/homework-create.component';
import { HomeworkDetailsComponent } from './homework-details/homework-details.component';
import { HomeworkEditComponent } from './homework-edit/homework-edit.component';
import { HomeworkListComponent } from './homework-list/homework-list.component';

const routes: Routes = [
  { path: '', component: HomeworkListComponent },
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
