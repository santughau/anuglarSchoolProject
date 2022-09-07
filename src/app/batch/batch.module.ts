import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchListComponent } from './batch-list/batch-list.component';
import { BatchCreateComponent } from './batch-create/batch-create.component';
import { BatchEditComponent } from './batch-edit/batch-edit.component';
import { BatchRoutingModule } from './batch-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { BatchDetailsComponent } from './batch-details/batch-details.component';
import { BatchService } from './batch.service';
import { FormsModule } from '@angular/forms';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';



@NgModule({
  declarations: [BatchListComponent,
    BatchCreateComponent,
    BatchEditComponent,
    BatchDetailsComponent],
  imports: [
    CommonModule,BatchRoutingModule,FormsModule,SharedModulesModule,NgxBootstrapModule
  ],
  providers: [BatchService],
})
export class BatchModule {
  
 }
