import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeCreateComponent } from './fee-create/fee-create.component';
import { FeeEditComponent } from './fee-edit/fee-edit.component';
import { FeeListComponent } from './fee-list/fee-list.component';

const routes: Routes = [
  { path: '', component: FeeListComponent },
  { path: 'feeCreate', component: FeeCreateComponent },
  { path: 'feeEdit/:id', component: FeeEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
