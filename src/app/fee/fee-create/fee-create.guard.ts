import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FeeCreateComponent } from './fee-create.component';

@Injectable({
  providedIn: 'root'
})
export class FeeCreateGuard implements CanDeactivate<FeeCreateComponent> {
  canDeactivate(
    component: FeeCreateComponent): boolean {
      if (component.feeForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
