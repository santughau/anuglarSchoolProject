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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expences } from './expences.model';

@Injectable({
  providedIn: 'root'
})
export class ExpencesService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }
/* 
  createExpense(data: any): Observable<any> {
    return this.http.post(this.url + 'expense/create.php', data,)
  }

  deleteExpense(data:any): Observable<any> {
    return this.http.post(this.url + 'expense/delete.php', data)
  }

  getSingleExpense(id:any):Observable<any> {    
    return this.http.get(this.url + 'expense/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateExpense(data: any): Observable<any> {
    return this.http.post(this.url + 'expense/update.php', data);    
  }

  getAllExpenses(): Observable<any> {
    return this.http.get(this.url + 'expense/read.php?v=' + Math.random())
  } */
}
