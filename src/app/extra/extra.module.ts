import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraRoutingModule } from './extra-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { ComplainComponent } from './complain/complain.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [RegistrationComponent, ComplainComponent, ProfileComponent],
  imports: [
    CommonModule,
    ExtraRoutingModule
  ]
})
export class ExtraModule { }
