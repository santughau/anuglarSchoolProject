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
