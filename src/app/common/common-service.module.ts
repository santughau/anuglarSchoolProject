import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { CommonServiceService } from './common-service.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    IndexPageComponent,
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
  providers: [CommonServiceService],
})
export class CommonServiceModule { }
