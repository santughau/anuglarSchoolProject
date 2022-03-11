import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryCreateComponent } from './gallery-create/gallery-create.component';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';

const routes: Routes = [
  { path: '', component: GalleryListComponent },
  { path: 'galleryCreate', component: GalleryCreateComponent },
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
