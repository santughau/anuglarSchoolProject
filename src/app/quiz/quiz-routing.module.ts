import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizAddQuestionComponent } from './quiz-add-question/quiz-add-question.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizMarksComponent } from './quiz-marks/quiz-marks.component';

const routes: Routes = [
  { path: 'quizList', component: QuizListComponent },
  { path: 'quizCreate', component: QuizCreateComponent },
  { path: 'quizEdit/:id', component: QuizEditComponent },
  { path: 'quizDetails/:id', component: QuizDetailsComponent },
  { path: 'quizAddQuestions/:id', component: QuizAddQuestionComponent },
  { path: 'quizMarks/:id', component: QuizMarksComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class QuizRoutingModule { }
