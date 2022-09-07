import { NgModule  } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsModule } from './events/events.module';
import { ExtraModule } from './extra/extra.module';
import { ClassTitleModule } from './classTitle/class-title.module';
import { SubjectModule } from './subject/subject.module';
import { ChapterModule } from './chapter/chapter.module';
import { HomeworkModule } from './homework/homework.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './header.interceptor';
import { ExcelServiceService } from './shared/services/excel-service.service';
import { CommonServiceModule } from './common/common-service.module';


@NgModule({
  declarations: [
    AppComponent,
   
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
    ChapterModule,CommonServiceModule, 
    HomeworkModule,PdfViewerModule,HttpClientModule,
  ],
 
  
  
  providers: [ExcelServiceService, {  
    provide: HTTP_INTERCEPTORS,  
    useClass: HeaderInterceptor,  
    multi: true  
  }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


