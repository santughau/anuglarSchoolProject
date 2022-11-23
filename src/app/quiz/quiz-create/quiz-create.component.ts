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
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
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



  saveQuiz() {
    const data = {
      'quizClassId': this.classList.classId,
      'quizSubjectId': this.subjectModel.subjectId,
      'quizChapterId': this.chapterModel.chapterId,
      'quizTitle': this.quiz.quizTitle,
    }
    console.log(data);
    this.spinner.show();
    this.Quizservice.createQuiz(data).subscribe((event: any) => {
      this.toastr.success('Quiz  Uploaded Successfully!', 'Weldone!', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
      });
    });

    this.router.navigate(['/quiz/quizList']);
  }

}
