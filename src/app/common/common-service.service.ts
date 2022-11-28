/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  brandName = new Subject<any>()
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

 /*  getProfile(id?:any):Observable<any> {    
    return this.http.get(this.url + 'profile/read_one.php?id=' + id + '&v=' + Math.random());
  } */

  /* updateProfile(data: any): Observable<any> {
    return this.http.post(this.url + 'profile/update.php', data);    
  } */

}

