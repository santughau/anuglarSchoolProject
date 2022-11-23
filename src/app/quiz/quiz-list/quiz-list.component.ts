import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { ChapterService } from '../../chapter/chapter.service';
import { HomeworkService } from 'src/app/homework/homework.service';
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
  constructor(private Quizservice: QuizService, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService, private service: ChapterService, private Homeservice: HomeworkService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.spinner.hide();
    })
  }

  loadSubjects(ev: any) {
    this.subjectModel.subjectId = 'select'
    //console.log(ev);
    const id = ev.target.value;
    this.spinner.show();
    this.service.getSubjectClassWise(id).subscribe((data) => {
      this.subjects = data.document;
      //console.log(this.subjects);
      this.spinner.hide();
    })

  }

  loadChapters(ev: any) {
    this.chapterModel.chapterId = 'select'
    const id = ev.target.value;
    console.log(id);

    this.spinner.show();
    this.Homeservice.getChapters(id).subscribe((data) => {
      console.log(data);

      this.chapters = data.document;
      console.log(this.chapters);
      this.spinner.hide();
    })
  }

  loadQuiz(ev: any) {
    this.chapterId = ev.target.value;
    console.log(this.chapterId);

    this.spinner.show();
    this.getVideoData(this.chapterId);
  }

  getVideoData(Id: any): void {
    this.Quizservice.getAllQuzes(Id).subscribe((data) => {
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
      this.spinner.hide();
    })
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
