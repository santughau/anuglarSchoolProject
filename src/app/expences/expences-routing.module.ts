import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpencesCreateComponent } from './expences-create/expences-create.component';
import { ExpencesEditComponent } from './expences-edit/expences-edit.component';
import { ExpencesListComponent } from './expences-list/expences-list.component';

const routes: Routes = [
  { path: '', component: ExpencesListComponent },
  { path: 'expencesCreate', component: ExpencesCreateComponent },
  { path: 'expencesEdit/:id', component: ExpencesEditComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ExpencesRoutingModule { }
