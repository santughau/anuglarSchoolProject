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
import { Routes ,RouterModule} from '@angular/router';
import { BatchListComponent } from './batch-list/batch-list.component';
import { BatchCreateComponent } from './batch-create/batch-create.component';
import { BatchEditComponent } from './batch-edit/batch-edit.component';
import { BatchDetailsComponent } from './batch-details/batch-details.component';

const routes: Routes = [
  { path: 'batchList', component: BatchListComponent },
  { path: 'batchCreate', component: BatchCreateComponent },
  { path: 'batchEdit/:id', component: BatchEditComponent },
  { path: 'batchDetails/:id', component: BatchDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
