import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from '../chapter.model';
import { ChapterService } from '../chapter.service';
@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  spinner: boolean = true;
  chapter: Chapter = {
    chapterId: '',
    chapterClassId: '',
    chapterClass: '',
    chapterSubject: '',
    chapterSubjectId: '',
    chapterName: ''
  }
  constructor(private router: Router, private service: ChapterService) { }

  ngOnInit(): void {
  }

}
