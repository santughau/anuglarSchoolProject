import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    IndexPageComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,AppRoutingModule,FormsModule
  ],
  exports:[ HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    IndexPageComponent,],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
})
export class CommonServiceModule { }
