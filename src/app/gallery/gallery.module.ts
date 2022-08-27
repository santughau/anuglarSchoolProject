import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryCreateComponent } from './gallery-create/gallery-create.component';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryService } from './gallery.service';
import { FormsModule } from '@angular/forms';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';



@NgModule({
  declarations: [GalleryListComponent,
    GalleryCreateComponent,
    GalleryEditComponent,],
  imports: [
    CommonModule,GalleryRoutingModule,FormsModule,SharedModulesModule,NgxBootstrapModule
  ],
  providers: [GalleryService],
})
export class GalleryModule {
 }
