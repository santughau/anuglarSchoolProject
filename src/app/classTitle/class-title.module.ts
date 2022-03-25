import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassTitleRoutingModule } from './class-title-routing.module';
import { ClassTitleComponent } from './class-title/class-title.component';
import { ClassTitleEditComponent } from './class-title-edit/class-title-edit.component';
import { ClassTitleService } from './class-title.service';



@NgModule({
  declarations: [ClassTitleComponent, ClassTitleEditComponent],
  imports: [
    CommonModule,
    ClassTitleRoutingModule
  ],
  providers: [ClassTitleService],
})
export class ClassTitleModule { }
