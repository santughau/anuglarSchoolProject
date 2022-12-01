/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }


 /*  createQuiz(data: any): Observable<any> {
    return this.http.post(this.url + 'quiz/create.php', data);
  }

  createQuestions(data: any): Observable<any> {
    return this.http.post(this.url + 'question/create.php', data);
  }

  getAllQuzes(id: any): Observable<any> {
    return this.http.get(this.url + 'quiz/read.php?id=' + id + '&v=' + Math.random())
  }

  

  getAllQuestions(id: any): Observable<any> {
    return this.http.get(this.url + 'question/read.php?id=' + id + '&v=' + Math.random())
  } */
}
