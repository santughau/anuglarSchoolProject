/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  serverUrl = environment.baseUrl;
  uniqueUrl = '&v=' + Math.random();
  internetOnline: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService,) { 
    this.checkInternetConnection();
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }

  postMethod(url, body): Observable<any> {
    console.log(body);
    
    return this.http.post(this.serverUrl + url, body);
  }

  getMethod(url: any): Observable<any> {
    return this.http.get(this.serverUrl + url )
  }

  successMsg(msg1, msg2) {
    this.toastr.success(msg1, msg2, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
  }

  errorsMsg(msg1, msg2) {
    this.toastr.error(msg1, msg2, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  checkLengthArray(data: any) {
    if (data.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  checkInternetConnection() {
    if(navigator.onLine) {
      this.internetOnline = true;
     }
     else {
      this.internetOnline = false;
     }
  }
}
