/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { AfterViewInit, ChangeDetectorRef, TemplateRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../video.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, AfterViewInit, OnDestroy {
  modalRef?: BsModalRef;
  showVideo: boolean = false;
  showMsg: boolean = false;
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
    chapterTopicId:''
  }
  videos: Video[] = [];
  chapterId: any = '';
  apiLoaded = false;
  width = '100%';
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer!: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  constructor(private _changeDetectorRef: ChangeDetectorRef,private router : Router, private _route: ActivatedRoute,private modalService: BsModalService,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.showMsg = false;
    this.chapterId = this._route.snapshot.paramMap.get('id');
    console.log('ss' + this.chapterId);
    if (this.chapterId !== null) {
      this.getVideoData(this.chapterId);
    }    
    this.getData();
    if (!this.apiLoaded) {      
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }


  getData() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.appService.hideSpinner();
    })
  }

  loadSubjects(ev: any) { 
    this.subjectModel.subjectId = 'select'
    //console.log(ev);
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id=' +id).subscribe((data) => {
      this.subjects = data.document;
      //console.log(this.subjects);
      this.appService.hideSpinner();
    })    
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
    });
  }

  loadVideos(ev: any) {
    this.chapterId = ev.target.value;
    console.log(this.chapterId);    
    this.appService.showSpinner();
    this.getVideoData(this.chapterId);
  }

  getVideoData(chapterId:any) {
    this.appService.getMethod('video/read.php?id=' + chapterId).subscribe((data) => {
      console.log(data);
      this.videos = data.document;
      console.log("lenght = " + this.videos.length);
      if (this.videos.length !== 0) {
        this.showVideo = true;
        this.showMsg = false;
      } else {
        this.showMsg = true;
        this.showVideo = false;
      }
      console.log(this.videos);
      this.appService.hideSpinner();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  confirm(id:any): void {
    console.log(id); 
    const data = {
      'videoId' : id
    }
    this.appService.postMethod('video/delete.php',data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/video/videoList']);
      this.getVideoData(this.chapterId);
    });
    this.appService.errorsMsg('Video Deleted Successfully!', 'Weldone!');
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }

  editVideo(id:any) {
    console.log(id);
    this.router.navigate(['video/videoEdit', id])
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1200px x 720px
    this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

}
