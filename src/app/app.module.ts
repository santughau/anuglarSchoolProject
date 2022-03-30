import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StudentModule } from './student/student.module';
import { GalleryModule } from './gallery/gallery.module';
import { BatchModule } from './batch/batch.module';
import { FeeModule } from './fee/fee.module';
import { ExpencesModule } from './expences/expences.module';
import { ExamModule } from './exam/exam.module';
import { MessagesModule } from './messages/messages.module';



import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { IndexPageComponent } from './common/index-page/index-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsModule } from './events/events.module';
import { ExtraModule } from './extra/extra.module';
import { ClassTitleModule } from './classTitle/class-title.module';
import { SubjectModule } from './subject/subject.module';
import { ChapterModule } from './chapter/chapter.module';
import { HomeworkModule } from './homework/homework.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { StudentService } from './student/student.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    IndexPageComponent,
   
  ],
  imports: [
    BrowserModule,
    StudentModule,
    GalleryModule,
    BatchModule,
    AppRoutingModule,
    FeeModule,
    ExpencesModule,
    ExamModule,
    MessagesModule,
    BrowserAnimationsModule,
    EventsModule,
    ExtraModule,
    ClassTitleModule,
    SubjectModule,
    ChapterModule,
    HomeworkModule,PdfViewerModule,HttpClientModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }


