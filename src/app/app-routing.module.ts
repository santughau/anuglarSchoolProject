import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { IndexPageComponent } from './common/index-page/index-page.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';




const routes: Routes = [

  { path: 'indexpage', component: IndexPageComponent },
  { path: '', redirectTo: '/page', pathMatch: 'full' },

  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },

  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
  },

  {
    path: 'batch',
    loadChildren: () => import('./batch/batch.module').then(m => m.BatchModule)
  },

  {
    path: 'fee',
    loadChildren: () => import('./fee/fee.module').then(m => m.FeeModule)
  },

  

  {
    path: 'expences',
    loadChildren: () => import('./expences/expences.module').then(m => m.ExpencesModule)
  },

  {
    path: 'exam',
    loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule)
  },

  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)
  },

  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  },

  {
    path: 'extra',
    loadChildren: () => import('./extra/extra.module').then(m => m.ExtraModule)
  },

  {
    path: 'class',
    loadChildren: () => import('./classTitle/class-title.module').then(m => m.ClassTitleModule)
  },


  {
    path: 'subject',
    loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)
  },

  {
    path: 'homework',
    loadChildren: () => import('./homework/homework.module').then(m => m.HomeworkModule)
  },

  {
    path: 'termexam',
    loadChildren: () => import('./termExam/termexam.module').then(m => m.TermexamModule)
  },

  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
  },

  {
    path: 'video',
    loadChildren: () => import('./video/video.module').then(m => m.VideoModule)
  },

  {
    path: 'chapter',
    loadChildren: () => import('./chapter/chapter.module').then(m => m.ChapterModule)
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],


  exports: [RouterModule]
})
export class AppRoutingModule { }
