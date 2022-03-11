import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesCreateComponent } from './messages-create/messages-create.component';
import { MessagesEditComponent } from './messages-edit/messages-edit.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

const routes: Routes = [
  { path: '', component: MessagesListComponent },
  { path: 'messagesCreate', component: MessagesCreateComponent },
  { path: 'messagesEdit/:id', component: MessagesEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MessagesRoutingModule { }
