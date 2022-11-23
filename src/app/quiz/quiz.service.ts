import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }


  createQuiz(data: any): Observable<any> {
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
  }
}
