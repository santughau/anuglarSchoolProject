import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeListComponent } from './fee-list/fee-list.component';
import { FeeCreateComponent } from './fee-create/fee-create.component';
import { FeeEditComponent } from './fee-edit/fee-edit.component';
import { FeeRoutingModule } from './fee-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';



@NgModule({
  declarations: [FeeListComponent,
    FeeCreateComponent,
    FeeEditComponent,],
  imports: [
    CommonModule,FeeRoutingModule,NgxBootstrapModule,
  ]
})
export class FeeModule { }
