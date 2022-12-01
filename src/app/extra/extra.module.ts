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
import { CommonModule } from '@angular/common';
import { ExtraRoutingModule } from './extra-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { ComplainComponent } from './complain/complain.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SharedModulesModule } from '../shared/shared-modules/shared-modules.module';



@NgModule({
  declarations: [RegistrationComponent, ComplainComponent, ProfileComponent],
  imports: [
    CommonModule,FormsModule,SharedModulesModule,NgxBootstrapModule,
    ExtraRoutingModule
  ],
  providers: [],
})
export class ExtraModule { }
