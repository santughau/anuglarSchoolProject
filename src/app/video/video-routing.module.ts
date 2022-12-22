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
import { VideoCreateComponent } from './video-create/video-create.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { VideoCreateGuard } from './video-create/video-create.guard';

const routes: Routes = [
  { path: 'videoList', component: VideoListComponent },
  { path: 'videoCreate',canDeactivate:[VideoCreateGuard], component: VideoCreateComponent },
  
  { path: 'videoEdit/:id',component: VideoEditComponent },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VideoRoutingModule { }
