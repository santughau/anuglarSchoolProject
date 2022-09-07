import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpencesListComponent } from './expences-list/expences-list.component';
import { ExpencesCreateComponent } from './expences-create/expences-create.component';
import { ExpencesEditComponent } from './expences-edit/expences-edit.component';
import { ExpencesRoutingModule } from './expences-routing.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { ExpencesService } from './expences.service';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExpencesListComponent,
    ExpencesCreateComponent,
    ExpencesEditComponent,],
  imports: [
    CommonModule,
    ExpencesRoutingModule,SharedModulesModule,FormsModule,NgxBootstrapModule
  ],
  providers: [ExpencesService],
})
export class ExpencesModule {
}
