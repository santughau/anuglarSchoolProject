import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Homework } from './homework.model';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  url = "http://localhost/ranjana/";
   
  constructor(private http: HttpClient) { }
 
  
  getChapters(id:any):Observable<any> {    
    return this.http.get(this.url + 'chapter/read_By_subjectClassId.php?id=' + id + '&v=' + Math.random());
  }

  createHomework(data: any): Observable<any> {   
    return this.http.post(this.url + 'homework/create.php', data, {
      reportProgress: true,
      observe: 'events'
    })
  }

  getHomework(id:any):Observable<any> {    
    return this.http.get(this.url + 'homework/read.php?id=' + id + '&v=' + Math.random());
  }

  deleteHomework(data: any): Observable<any> {
    return this.http.post(this.url + 'homework/delete.php', data)
  }

  getSingleHomework(id: any): Observable<any> {
    return this.http.get(this.url + 'homework/read_one.php?id=' + id + '&v=' + Math.random());
  }
}
