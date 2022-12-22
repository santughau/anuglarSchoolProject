import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryCreateComponent } from './gallery-create.component';

@Injectable({
  providedIn: 'root'
})
export class GalleryCreateGuard implements CanDeactivate<GalleryCreateComponent> {
  canDeactivate(
    component: GalleryCreateComponent): boolean  {
      if (component.galleryForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
