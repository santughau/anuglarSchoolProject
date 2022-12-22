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
import { RouterModule, Routes } from '@angular/router';
import { GalleryCreateComponent } from './gallery-create/gallery-create.component';
import { GalleryCreateGuard } from './gallery-create/gallery-create.guard';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';

const routes: Routes = [
  { path: 'galleryList', component: GalleryListComponent },
  { path: 'galleryCreate', canDeactivate: [GalleryCreateGuard], component: GalleryCreateComponent },
  { path: 'galleryEdit/:id', component: GalleryEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
