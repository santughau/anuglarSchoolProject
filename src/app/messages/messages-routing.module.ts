/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageCreateGuard } from './messages-create/message-create.guard';
import { MessagesCreateComponent } from './messages-create/messages-create.component';
import { MessagesEditComponent } from './messages-edit/messages-edit.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

const routes: Routes = [
  { path: 'messageList', component: MessagesListComponent },
  { path: 'messagesCreate', canDeactivate:[MessageCreateGuard], component: MessagesCreateComponent },
  { path: 'messagesEdit/:id',component: MessagesEditComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MessagesRoutingModule { }
