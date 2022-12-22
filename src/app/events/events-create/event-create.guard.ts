import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsCreateComponent } from './events-create.component';

@Injectable({
  providedIn: 'root'
})
export class EventCreateGuard implements CanDeactivate<EventsCreateComponent> {
  canDeactivate(
    component: EventsCreateComponent): boolean {
      if (component.eventForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
