import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../video.model';
import { VideoService } from '../video.service';
@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {
  video: Video = {
    videoId: '',
    videoClass: '',
    videoSubject: '',
    videoChapter: '',
    videoTitle: '',
    videoLink: ''
  }
  constructor(private router: Router, private service: VideoService) { }

  ngOnInit(): void {
  }

}
