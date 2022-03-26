import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../video.model';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
export class VideoCreateComponent implements OnInit {

  constructor(private router : Router, private service :VideoService) { }

  ngOnInit(): void {
  }

}
