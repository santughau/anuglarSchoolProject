import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizCreateComponent } from './quiz-create.component';

@Injectable({
  providedIn: 'root'
})
export class QuizCreateGuard implements CanDeactivate<QuizCreateComponent> {
  canDeactivate(
    component: QuizCreateComponent): boolean  {
      if (component.quizForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
