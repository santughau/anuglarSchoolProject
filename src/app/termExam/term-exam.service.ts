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
import { Termexam } from './termexam.model';

@Injectable({
  providedIn: 'root'
})
export class TermExamService {

  url = "http://localhost/ranjana/";
   
  constructor(private http: HttpClient) { }
 
  
  /* getChapters(id:any):Observable<any> {    
    return this.http.get(this.url + 'chapter/read_By_subjectClassId.php?id=' + id + '&v=' + Math.random());
  }

  createTermExam(data: any): Observable<any> {   
    return this.http.post(this.url + 'termexam/create.php', data, {
      reportProgress: true,
      observe: 'events'
    })
  }

  getTermExam(termExamId:any,subjectId:any):Observable<any> {    
    return this.http.get(this.url + 'termexam/read.php?termexamExamId=' + termExamId + '&termexamSubjectId=' + subjectId + '&v=' + Math.random());
  }

  deleteTermExam(data: any): Observable<any> {
    return this.http.post(this.url + 'termexam/delete.php', data)
  }

  getSingleTermExam(id: any): Observable<any> {
    return this.http.get(this.url + 'termexam/read_one.php?id=' + id + '&v=' + Math.random());
  }
 */}
