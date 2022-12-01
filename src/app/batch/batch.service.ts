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
import { Batch } from './batch.model';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  /* getAllClass(): Observable<any> {
    return this.http.get(this.url + 'classlist/read.php?v=' + Math.random())
  } */

  /* createBatch(data: any): Observable<any> {
    return this.http.post(this.url + 'batch/create.php', data,)
  } */

 /*  getBatchWiseClass(id: any): Observable<any> {
    return this.http.get(this.url + 'batch/read_By_ClassWiase.php?id=' + id + '&v=' + Math.random());
  } */

 /*  deleteBatch(data: any): Observable<any> {
    return this.http.post(this.url + 'batch/delete.php', data)
  } */



  /* getSingleBatch(id: any): Observable<any> {
    return this.http.get(this.url + 'batch/read_one.php?id=' + id + '&v=' + Math.random());
  } */

 /*  updateBatch(data: any): Observable<any> {
    return this.http.post(this.url + 'batch/update.php', data);
  } */

  /* updateAttendance(data: any): Observable<any> {
    return this.http.post(this.url + 'batch/present.php', data);
  } */
}
