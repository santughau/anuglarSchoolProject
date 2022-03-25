import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassTitleEditComponent } from './class-title-edit/class-title-edit.component';
import { ClassTitleComponent } from './class-title/class-title.component';

const routes: Routes = [
  { path: 'classList', component: ClassTitleComponent },
  
  { path: 'classEdit/:id', component: ClassTitleEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ClassTitleRoutingModule { }
