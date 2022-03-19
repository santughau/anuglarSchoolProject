import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplainComponent } from './complain/complain.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'complain', component: ComplainComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ExtraRoutingModule { }
