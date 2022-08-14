import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassTitleRoutingModule } from './class-title-routing.module';
import { ClassTitleComponent } from './class-title/class-title.component';
import { ClassTitleEditComponent } from './class-title-edit/class-title-edit.component';
import { ClassTitleService } from './class-title.service';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { DataTablesModule } from 'angular-datatables';
import { ClassListComponent } from './class-list/class-list.component';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';





@NgModule({
  declarations: [ClassTitleComponent, ClassTitleEditComponent, ClassListComponent,],
  imports: [
    CommonModule,DataTablesModule.forRoot(),
    ClassTitleRoutingModule,FormsModule,SharedModulesModule
  ],
  providers: [ClassTitleService],
})
export class ClassTitleModule { }
