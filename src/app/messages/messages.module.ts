import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesEditComponent } from './messages-edit/messages-edit.component';
import { MessagesCreateComponent } from './messages-create/messages-create.component';
import { MessagesListComponent } from './messages-list/messages-list.component';



@NgModule({
  declarations: [ MessagesListComponent,
    MessagesCreateComponent,
    MessagesEditComponent,],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
