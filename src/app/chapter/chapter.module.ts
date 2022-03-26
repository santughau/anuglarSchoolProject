import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterService } from './chapter.service';
import { ChapterEditComponent } from './chapter-edit/chapter-edit.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';



@NgModule({
  declarations: [ChapterEditComponent,ChapterListComponent],
  imports: [
    CommonModule,
    ChapterRoutingModule
  ],
  providers: [ChapterService],
})
export class ChapterModule { }
