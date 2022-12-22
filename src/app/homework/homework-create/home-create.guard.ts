import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeworkCreateComponent } from './homework-create.component';

@Injectable({
  providedIn: 'root'
})
export class HomeCreateGuard implements CanDeactivate<HomeworkCreateComponent> {
  canDeactivate(
    component: HomeworkCreateComponent): boolean  {
      if (component.homework.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
