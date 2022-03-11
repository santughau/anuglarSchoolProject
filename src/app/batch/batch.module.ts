import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchListComponent } from './batch-list/batch-list.component';
import { BatchCreateComponent } from './batch-create/batch-create.component';
import { BatchEditComponent } from './batch-edit/batch-edit.component';
import { BatchRoutingModule } from './batch-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { BatchDetailsComponent } from './batch-details/batch-details.component';



@NgModule({
  declarations: [BatchListComponent,
    BatchCreateComponent,
    BatchEditComponent,
    BatchDetailsComponent,],
  imports: [
    CommonModule,BatchRoutingModule,NgxBootstrapModule,
  ]
})
export class BatchModule {
  constructor() {
    console.log("batch");
    
  }
 }
