import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExamCreateComponent } from './exam-create.component';
ExamCreateComponent
@Injectable({
  providedIn: 'root'
})
export class ExamCreateGuard implements CanDeactivate<ExamCreateComponent> {
  canDeactivate(
    component: ExamCreateComponent): boolean  {
      if (component.examForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
