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
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {
  @ViewChild('quizForm') public quizForm: NgForm;
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
  quiz = {
    quizId: '',
    quizClassId: '',
    quizSubjectId: '',
    quizChapterId: '',
    quizTitle: '',
  }
  quizId;
  constructor(private router: Router, public appService: SharedServiceService,private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.paramMap.get('id');
    this.appService.getMethod('quiz/read_one.php?id=' + this.quizId).subscribe((res) => {
      this.quiz.quizTitle = res.document.quizTitle;
     console.log(res);
      this.appService.hideSpinner();
    });
    this.getData()
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
    this.appService.getMethod('chapter/read_By_subjectClassId.php?id=' +id).subscribe((data) => {
      console.log(data);
      this.chapters = data.document;
      console.log(this.chapters);
      this.appService.hideSpinner();
    });
  }



  saveQuiz() {
    const data = {
      'quizClassId': this.classList.classId,
      'quizSubjectId': this.subjectModel.subjectId,
      'quizChapterId': this.chapterModel.chapterId,
      'quizTitle': this.quiz.quizTitle,
      'quizId': this.quizId,
    }
    console.log(data);
    this.appService.showSpinner();
    this.appService.postMethod('quiz/update.php', data).subscribe((event: any) => {
      this.quizForm.reset();
      this.appService.successMsg('Quiz  Uploaded Successfully!', 'Weldone!');
      this.appService.hideSpinner();
      this.router.navigate(['/quiz/quizList']);
    });
    
  }

}
