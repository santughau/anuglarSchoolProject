import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoRoutingModule } from './video-routing.module';
import { VideoCreateComponent } from './video-create/video-create.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoService } from './video.service';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';



@NgModule({
  declarations: [VideoCreateComponent, VideoListComponent,VideoEditComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,YouTubePlayerModule,SharedModulesModule,DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule,
  ],
  providers: [VideoService],
})
export class VideoModule { }
