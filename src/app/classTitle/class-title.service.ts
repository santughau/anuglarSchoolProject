import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassList } from './classList.model';

@Injectable({
  providedIn: 'root'
})
export class ClassTitleService {
  url = "http://localhost/ranjana/";
  url1 = "https://bpegm.in/angular/";




  constructor(private http: HttpClient) { }

  createClass(data: any): Observable<any> {
    return this.http.post(this.url + 'classlist/create.php', data,)
  }

  getAllClass(): Observable<any> {
    return this.http.get(this.url + 'classlist/read.php?v=' + Math.random())
  }

  getSingleClass(id: any): Observable<any> {
    return this.http.get(this.url + 'classlist/read_one.php?id=' + id + '&v=' + Math.random());
  }
  updateClass(data: any): Observable<any> {
    return this.http.post(this.url + 'classlist/update.php', data)
  }

  deleteClass(data: any): Observable<any> {
    return this.http.post(this.url + 'classlist/delete.php', data)
  }
}
