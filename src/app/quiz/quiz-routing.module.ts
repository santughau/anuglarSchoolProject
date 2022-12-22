/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuizAddQuestionComponent } from './quiz-add-question/quiz-add-question.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizCreateGuard } from './quiz-create/quiz-create.guard';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizMarksComponent } from './quiz-marks/quiz-marks.component';

const routes: Routes = [
  { path: 'quizList', component: QuizListComponent },
  { path: 'quizCreate',canDeactivate:[QuizCreateGuard], component: QuizCreateComponent },
  { path: 'quizEdit/:id', component: QuizEditComponent },
  { path: 'quizDetails/:id', component: QuizDetailsComponent },
  { path: 'quizAddQuestions/:id', component: QuizAddQuestionComponent },
  { path: 'quizMarks/:id', component: QuizMarksComponent },
  { path: 'questionEdit/:id', component: QuestionEditComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class QuizRoutingModule { }
