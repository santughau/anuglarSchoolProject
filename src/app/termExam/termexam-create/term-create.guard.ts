import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TermexamCreateComponent } from './termexam-create.component';

@Injectable({
  providedIn: 'root'
})
export class TermCreateGuard implements CanDeactivate<TermexamCreateComponent> {
  canDeactivate(
    component: TermexamCreateComponent): boolean {
      if (component.termexams.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
