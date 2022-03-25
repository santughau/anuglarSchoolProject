import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterService } from './chapter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChapterRoutingModule
  ],
  providers: [ChapterService],
})
export class ChapterModule { }
