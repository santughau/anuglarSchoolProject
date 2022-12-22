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
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { IndexPageComponent } from './common/index-page/index-page.component';
import { LoginComponent } from './common/login/login.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [  
   { path: '',redirectTo:'/login',pathMatch: 'full',  }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'indexpage', canActivate: [AuthGuard],component: IndexPageComponent }, 
  
  {
    path: 'student',canActivate: [AuthGuard],
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },

   {
    path: 'gallery',canActivate: [AuthGuard],
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
  }, 

  

  {
    path: 'batch',canActivate: [AuthGuard],
    loadChildren: () => import('./batch/batch.module').then(m => m.BatchModule)
  },

  {
    path: 'fee',canActivate: [AuthGuard],
    loadChildren: () => import('./fee/fee.module').then(m => m.FeeModule)
  },



  {
    path: 'expences',canActivate: [AuthGuard],
    loadChildren: () => import('./expences/expences.module').then(m => m.ExpencesModule)
  },

  {
    path: 'exam',canActivate: [AuthGuard],
    loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule)
  },

  {
    path: 'messages',canActivate: [AuthGuard],
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)
  },

  {
    path: 'events',canActivate: [AuthGuard],
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  },

  {
    path: 'extra',canActivate: [AuthGuard],
    loadChildren: () => import('./extra/extra.module').then(m => m.ExtraModule)
  },

  {
    path: 'class',canActivate: [AuthGuard],
    loadChildren: () => import('./classTitle/class-title.module').then(m => m.ClassTitleModule)
  },


  {
    path: 'subject',canActivate: [AuthGuard],
    loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)
  },

  {
    path: 'homework',canActivate: [AuthGuard],
    loadChildren: () => import('./homework/homework.module').then(m => m.HomeworkModule)
  },

  {
    path: 'termexam',canActivate: [AuthGuard],
    loadChildren: () => import('./termExam/termexam.module').then(m => m.TermexamModule)
  },

  {
    path: 'quiz',canActivate: [AuthGuard],
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
  },

  {
    path: 'video',canActivate: [AuthGuard],
    loadChildren: () => import('./video/video.module').then(m => m.VideoModule)
  },

  {
    path: 'chapter',canActivate: [AuthGuard],
    loadChildren: () => import('./chapter/chapter.module').then(m => m.ChapterModule)
  },
  
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],


  exports: [RouterModule]
})
export class AppRoutingModule { }
