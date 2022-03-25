import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoCreateComponent } from './video-create/video-create.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoEditComponent } from './video-edit/video-edit.component';

const routes: Routes = [
  { path: 'videoList', component: VideoListComponent },
  { path: 'videoCreate', component: VideoCreateComponent },
  
  { path: 'videoEdit/:id', component: VideoEditComponent },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VideoRoutingModule { }
