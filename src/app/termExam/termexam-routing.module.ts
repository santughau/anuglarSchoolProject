import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermexamCreateComponent } from './termexam-create/termexam-create.component';
import { TermexamDetailsComponent } from './termexam-details/termexam-details.component';
import { TermexamEditComponent } from './termexam-edit/termexam-edit.component';
import { TermexamListComponent } from './termexam-list/termexam-list.component';

const routes: Routes = [
  { path: 'termExamList', component: TermexamListComponent },
  { path: 'termexamCreate', component: TermexamCreateComponent },
  { path: 'termexamDetails/:id', component: TermexamDetailsComponent },
  { path: 'termexamEdit/:id', component: TermexamEditComponent, },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TermexamRoutingModule { }
