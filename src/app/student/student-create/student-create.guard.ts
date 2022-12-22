import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentCreateComponent } from './student-create.component';

@Injectable({
  providedIn: 'root'
})
export class StudentCreateGuard implements CanDeactivate<StudentCreateComponent> {
  canDeactivate(
    component: StudentCreateComponent): boolean {
      if (component.studentForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
