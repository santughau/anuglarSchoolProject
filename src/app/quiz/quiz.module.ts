import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { QuizAddQuestionComponent } from './quiz-add-question/quiz-add-question.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { QuizMarksComponent } from './quiz-marks/quiz-marks.component';
import { QuizService } from './quiz.service';



@NgModule({
  declarations: [
    QuizListComponent,
    QuizCreateComponent,
    QuizEditComponent,
    QuizDetailsComponent,
    QuizAddQuestionComponent,
    QuizMarksComponent
  ],
  imports: [
    CommonModule,FormsModule,
    QuizRoutingModule,NgxBootstrapModule,ReactiveFormsModule,EditorModule
  ],
  providers: [QuizService],
})
export class QuizModule { }
