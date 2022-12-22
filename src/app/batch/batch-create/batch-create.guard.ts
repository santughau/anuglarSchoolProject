import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BatchCreateComponent } from './batch-create.component';
@Injectable({
  providedIn: 'root'
})
export class BatchCreateGuard implements  CanDeactivate<BatchCreateComponent> {
 
  canDeactivate(
    component: BatchCreateComponent ): boolean {
      if (component.batchForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
