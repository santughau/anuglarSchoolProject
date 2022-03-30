import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from '../chapter.model';
import { ChapterService } from '../chapter.service';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {
  chapter: Chapter = {
    chapterId: '',
    chapterClassId: '',
    chapterClass: '',
    chapterSubject: '',
    chapterSubjectId: '',
    chapterName: ''
  }
  constructor(private router : Router, private service :ChapterService) { }

  ngOnInit(): void {
  }

}
