import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterEditComponent } from './chapter-edit/chapter-edit.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';

const routes: Routes = [
  { path: 'chapterList', component: ChapterListComponent },
  { path: 'chapterEdit/:id', component: ChapterEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ChapterRoutingModule { }
