import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fee } from './fee.model';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  createFee(data: any): Observable<any> {
    return this.http.post(this.url + 'fees/create.php', data,)
  }

  getLastInsertId(): Observable<any> {
    return this.http.get(this.url + 'fees/lastId.php');
  }

  getStudentAllFees(id: any): Observable<any> {
    return this.http.get(this.url + 'fees/read_By_studentId.php?id=' + id + '&v=' + Math.random());
  }

  deleteFees(data: any): Observable<any> {
    return this.http.post(this.url + 'fees/delete.php', data)
  }

  getSingleFee(id: any): Observable<any> {
    return this.http.get(this.url + 'fees/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateFee(data: any): Observable<any> {
    return this.http.post(this.url + 'fees/update.php', data);    
  }

}
