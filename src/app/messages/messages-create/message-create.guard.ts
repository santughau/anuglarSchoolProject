import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MessagesCreateComponent } from './messages-create.component';

@Injectable({
  providedIn: 'root'
})
export class MessageCreateGuard implements CanDeactivate<MessagesCreateComponent> {
  canDeactivate(
    component: MessagesCreateComponent): boolean  {
      if (component.messageForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
