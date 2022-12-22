/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryCreateComponent } from './gallery-create/gallery-create.component';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { GalleryCreateGuard } from './gallery-create/gallery-create.guard';



@NgModule({
  declarations: [GalleryListComponent,
    GalleryCreateComponent,
    GalleryEditComponent,],
  imports: [
    CommonModule,GalleryRoutingModule,FormsModule,SharedModulesModule,NgxBootstrapModule
  ],
  providers: [GalleryCreateGuard],
})
export class GalleryModule {
 }
