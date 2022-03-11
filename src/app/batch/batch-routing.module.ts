import { NgModule } from '@angular/core';
import { Routes ,RouterModule} from '@angular/router';
import { BatchListComponent } from './batch-list/batch-list.component';
import { BatchCreateComponent } from './batch-create/batch-create.component';
import { BatchEditComponent } from './batch-edit/batch-edit.component';
import { BatchDetailsComponent } from './batch-details/batch-details.component';

const routes: Routes = [
  { path: '', component: BatchListComponent },
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
