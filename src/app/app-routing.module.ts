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

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],


  exports: [RouterModule]
})
export class AppRoutingModule { }
