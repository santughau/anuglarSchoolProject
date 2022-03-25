import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SubjectListComponent } from './subject-list/subject-list.component';

const routes: Routes = [
  { path: 'subjectList', component: SubjectListComponent },
  { path: 'subjectEdit/:id', component: SubjectEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SubjectRoutingModule { }
