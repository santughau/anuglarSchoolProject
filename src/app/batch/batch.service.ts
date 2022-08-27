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

  getAllClass(): Observable<any> {
    return this.http.get(this.url + 'classlist/read.php?v=' + Math.random())
  }

  createBatch(data: any): Observable<any> {
    return this.http.post(this.url + 'batch/create.php', data,)
  }

  getBatchWiseClass(id:any):Observable<any> {    
    return this.http.get(this.url + 'batch/read_By_ClassWiase.php?id=' + id + '&v=' + Math.random());
  }

  deleteBatch(data:any): Observable<any> {
    return this.http.post(this.url + 'batch/delete.php', data)
  }

  

  getSingleBatch(id:any):Observable<any> {    
    return this.http.get(this.url + 'batch/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateBatch(data: any): Observable<any> {
    return this.http.post(this.url + 'batch/update.php', data);    
  }
}
