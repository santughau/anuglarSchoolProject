import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddSubjectComponent } from './add-subject.component';

@Injectable({
  providedIn: 'root'
})
export class SubjectCreateGuard implements CanDeactivate<AddSubjectComponent> {
  canDeactivate(
    component: AddSubjectComponent): boolean {
      if (component.subjectForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
