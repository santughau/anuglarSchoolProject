import { NgModule } from '@angular/core';
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
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


