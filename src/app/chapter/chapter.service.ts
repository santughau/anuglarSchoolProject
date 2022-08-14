import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter } from './chapter.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  getAllClass(): Observable<any> {
    return this.http.get(this.url + 'classlist/read.php?v=' + Math.random())
  }

  getSubjectClassWise(id:any):Observable<any> {
    //return this.http.post(this.url + 'subjectmodel/read_one.php', data)
    return this.http.get(this.url + 'subjectmodel/read_By_subjectClassId.php?id=' + id + '&v=' + Math.random());
  }

  createChapter(data: any): Observable<any> {
    return this.http.post(this.url + 'chapter/create.php', data,)
  }
}
