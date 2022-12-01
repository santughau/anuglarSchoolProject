/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  showQuiz: boolean = false;
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
    chapterTopicId: ''
  }
  quiz: Quiz = {
    quizId: '',
    quizClassId: '',
    quizSubjectId: '',
    quizChapterId: '',
    quizTitle: '',
  }

  quizes: Quiz[] = [];
  chapterId: any = '';
  constructor( private router: Router, public appService: SharedServiceService) { }

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
    });
  }

  loadQuiz(ev: any) {
    this.chapterId = ev.target.value;
    console.log(this.chapterId);
    this.appService.showSpinner();
    this.getVideoData(this.chapterId);
  }

  getVideoData(Id: any): void {
    this.appService.getMethod('quiz/read.php?id=' + Id).subscribe((data) => {
      console.log(data);
      this.quizes = data.document;
      console.log("lenght = " + this.quizes.length);
      if (this.quizes.length !== 0) {
        this.showQuiz = true;
        this.showMsg = false;
      } else {
        this.showMsg = true;
        this.showQuiz = false;
      }
      console.log(this.quizes);
      this.appService.hideSpinner();
    });
  }

  addQuestions(id: any) {
    this.router.navigate(['/quiz/quizAddQuestions', id]);
  }

  viewQuestions(id: any) {
    this.router.navigate(['/quiz/quizDetails', id]);
  }

  listQuestions(id: any) {

  }

  EditdQuestions(id: any) {

  }

  deletedQuestions(id: any) {

  }

}
