import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenize } from 'ngx-bootstrap/typeahead';
import { SharedServiceService } from './shared/services/shared-service.service';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(public appService: SharedServiceService, private router: Router,) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /* console.log('request ' + JSON.stringify(request));
    console.log('next ' + JSON.stringify(next));
     */
    /*  let tokeninzedReq = request.clone({
       setHeaders: {
        // Authorization: 'Bearer xx.yy.zz',
       }
     }) */
    /*  if (!this.appService.isUserLogin) {
       this.router.navigate(['/login']);
       console.log(this.appService.isUserLogin);
       
     } */
    let token = this.appService.getToken();
    if (token == '') {
      token = 'ss';
    }
    const httpRequests = request.clone({
      headers: new HttpHeaders({
        /*  'Cache-Control': 'no-cache',
        'Pragma': 'no-cache', 
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        //'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT' */
        Authorization: 'Bearer ' + token
      })
    });
    return next.handle(httpRequests);
  }
}
