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
import { FormsModule } from '@angular/forms';
import { VideoRoutingModule } from './video-routing.module';
import { VideoCreateComponent } from './video-create/video-create.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { VideoCreateGuard } from './video-create/video-create.guard';



@NgModule({
  declarations: [VideoCreateComponent, VideoListComponent,VideoEditComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,YouTubePlayerModule,SharedModulesModule,DataTablesModule.forRoot(),FormsModule,NgxBootstrapModule,
  ],
  providers: [VideoCreateGuard],
})
export class VideoModule { }
