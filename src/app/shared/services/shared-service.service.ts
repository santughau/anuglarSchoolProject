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
import { BehaviorSubject, Observable } from 'rxjs';
//import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  serverUrl = environment.baseUrl;
  uniqueUrl = '&v=' + Math.random();
  internetOnline: boolean = false;
  public isUserLogin = new BehaviorSubject<boolean>(false);

  constructor(private meta : Meta, private title: Title,private http: HttpClient, private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService,) {
    this.checkInternetConnection();
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  setMeta(title, desc,author,keyword,) {
    this.meta.addTags([
      { name: 'description', content: desc },
      { name: 'author', content: author },
      { name: 'keyword', content: keyword },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index,follow' },
    ]);
    this.title.setTitle(title)
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
      this.isUserLogin.next(true);
      return true
    }
    this.isUserLogin.next(false);
    return false;
  }

  postMethod(url, body): Observable<any> {
    this.isLoggedIn()
    return this.http.post(this.serverUrl + url, body,/*  {
      reportProgress: true,
      observe: 'events'
    } */);
  }

  getMethod(url: any): Observable<any> {
    this.isLoggedIn()
    return this.http.get(this.serverUrl + url)
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
    if (navigator.onLine) {
      this.internetOnline = true;
    }
    else {
      this.internetOnline = false;
    }
  }
}
