import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassTitleComponent } from './class-title.component';

@Injectable({
  providedIn: 'root'
})
export class ClassCreateGuard implements CanDeactivate<ClassTitleComponent> {
  canDeactivate(
    component: ClassTitleComponent): boolean {
      if (component.classForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
