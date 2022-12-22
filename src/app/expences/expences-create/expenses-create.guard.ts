import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpencesCreateComponent } from './expences-create.component';

@Injectable({
  providedIn: 'root'
})
export class ExpensesCreateGuard implements CanDeactivate<ExpencesCreateComponent> {
  canDeactivate(
    component: ExpencesCreateComponent): boolean  {
      if (component.expenseForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
