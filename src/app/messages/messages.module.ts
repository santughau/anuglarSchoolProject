import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesEditComponent } from './messages-edit/messages-edit.component';
import { MessagesCreateComponent } from './messages-create/messages-create.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from './messages.service';


@NgModule({
  declarations: [ MessagesListComponent,
    MessagesCreateComponent,
    MessagesEditComponent,],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    MessagesRoutingModule,EditorModule
  ],
  providers: [MessagesService],
})
export class MessagesModule { }
