import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryCreateComponent } from './gallery-create/gallery-create.component';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { GalleryRoutingModule } from './gallery-routing.module';



@NgModule({
  declarations: [GalleryListComponent,
    GalleryCreateComponent,
    GalleryEditComponent,],
  imports: [
    CommonModule,GalleryRoutingModule
  ]
})
export class GalleryModule { }
