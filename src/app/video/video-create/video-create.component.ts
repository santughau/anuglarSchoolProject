/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../video.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
export class VideoCreateComponent implements OnInit {
  @ViewChild('videoForm') public videoForm: NgForm;
  allClassList: any[] = [];
  subjects: any[] = [];
  chapters: any[] = [];
  classList: ClassList = {
    className: '',
    classId: 'select',
  }
  subjectModel: SubjectModel = {
    subjectId: 'select',
    subjectClassId: '',
    subjectClass: '',
    subjectName: '',
  }
  chapterModel: Chapter = {
    chapterId: 'select',
    chapterClassId: '',
    chapterClass: '',
    chapterSubject: '',
    chapterSubjectId: '',
    chapterName: '',
    chapterTopicId: ''
  }
  video: Video = {
    videoId: '',
    videoClassId: '',
    videoSubjectId: '',
    videoChapterId: '',
    videoTitle: '',
    videoLink: ''
  }
  constructor(private router: Router, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.appService.hideSpinner();
    });
  }

  loadSubjects(ev: any) {
    this.subjectModel.subjectId = 'select'
    //console.log(ev);
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id=' + id).subscribe((data) => {
      this.subjects = data.document;
      //console.log(this.subjects);
      this.appService.hideSpinner();
    });
  }

  loadChapters(ev: any) {
    this.chapterModel.chapterId = 'select'
    const id = ev.target.value;
    console.log(id);
    this.appService.showSpinner();
    this.appService.getMethod('chapter/read_By_subjectClassId.php?id=' + id).subscribe((data) => {
      console.log(data);
      this.chapters = data.document;
      console.log(this.chapters);
      this.appService.hideSpinner();
    })
  }

  saveVideo() {
    const data = {
      'videoClassId': this.classList.classId,
      'videoSubjectId': this.subjectModel.subjectId,
      'videoChapterId': this.chapterModel.chapterId,
      'videoTitle': this.video.videoTitle,
      'videoLink': this.video.videoLink
    }
    console.log(data);
    this.appService.postMethod('video/create.php', data).subscribe((res) => {
      if (res.status == 'success') {
        this.videoForm.reset();
        this.router.navigate(['/video/videoList']);
        this.appService.successMsg('Video Created Successfully!', 'Weldone!');
      }
      this.appService.successMsg('Video Created Successfully!', 'Weldone!');
      
    });
  }
}
