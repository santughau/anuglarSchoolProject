import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedServiceService } from '../services/shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public appService: SharedServiceService, public router: Router) {}
  canActivate(): boolean  {
    if (this.appService.isUserLogin) {
      return true;
    }
    this.router.navigate(['login']);
    return false
  }
  
}
