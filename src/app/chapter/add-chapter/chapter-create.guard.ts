import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddChapterComponent } from './add-chapter.component';
AddChapterComponent
@Injectable({
  providedIn: 'root'
})
export class ChapterCreateGuard implements CanDeactivate<AddChapterComponent> {
  canDeactivate(
    component: AddChapterComponent,): boolean  {
      if (component.chapterForm.dirty) {
        return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
  
}
