import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentyComponent } from './presenty/presenty.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'studentCreate', component: StudentCreateComponent },
  { path: 'studentEdit/:id', component: StudentEditComponent },
  { path: 'studentDetails/:id', component: StudentDetailsComponent },
  { path: 'presenty/:id', component: PresentyComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
