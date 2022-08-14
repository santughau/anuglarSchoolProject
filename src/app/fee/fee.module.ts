import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeListComponent } from './fee-list/fee-list.component';
import { FeeCreateComponent } from './fee-create/fee-create.component';
import { FeeEditComponent } from './fee-edit/fee-edit.component';
import { FeeRoutingModule } from './fee-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { FeeService } from './fee.service';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';



@NgModule({
  declarations: [FeeListComponent,
    FeeCreateComponent,
    FeeEditComponent,],
  imports: [
    CommonModule,FeeRoutingModule,SharedModulesModule,
  ],
  providers: [FeeService],
})
export class FeeModule { }
