import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassList } from './classList.model';

@Injectable({
  providedIn: 'root'
})
export class ClassTitleService {
  url = "http://localhost/angular/";
  url1 = "https://mpscexam.in/angular/";




  constructor(private http: HttpClient) { }

  createClass(data: any): Observable<any> {
    return this.http.post(this.url1 + 'classlist/create.php', data,)
  }

  getAllClass(): Observable<any> {
    return this.http.get(this.url1 + 'classlist/read.php?v=' + Math.random())
  }

  getSingleClass(id: any): Observable<any>{
    return this.http.get(this.url1 + 'classlist/read_one.php?id=' + id +'v' + Math.random());
  }
  updateClass(data: any): Observable<any> {
    return this.http.post(this.url1 + 'classlist/update.php', data,)
  }
}
