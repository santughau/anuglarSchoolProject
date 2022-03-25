import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoutingModule } from './video-routing.module';
import { VideoCreateComponent } from './video-create/video-create.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoService } from './video.service';



@NgModule({
  declarations: [VideoCreateComponent, VideoListComponent,VideoEditComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,YouTubePlayerModule
  ],
  providers: [VideoService],
})
export class VideoModule { }
