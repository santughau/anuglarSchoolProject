import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { VideoCreateComponent } from './video-create.component';

@Injectable({
  providedIn: 'root'
})
export class VideoCreateGuard implements CanDeactivate<VideoCreateComponent> {
  canDeactivate(
    component: VideoCreateComponent): boolean {
      if (component.videoForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
