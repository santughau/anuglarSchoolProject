import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from './exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  createexam(data: any): Observable<any> {
    return this.http.post(this.url + 'exam/create.php', data,)
  }

  getAllExam(id): Observable<any> {
    return this.http.get(this.url + 'exam/read.php?id=' + id + '&v=' + Math.random());
  }

  deleteExam(data: any): Observable<any> {
    return this.http.post(this.url + 'exam/delete.php', data)
  }

  getSingleExan(id: any): Observable<any> {
    return this.http.get(this.url + 'exam/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateExam(data: any): Observable<any> {
    return this.http.post(this.url + 'exam/update.php', data);
  }


  
  getStudentListForDownload(id: any,batch:any): Observable<any> {
    return this.http.get(this.url + 'result/read.php?id=' + id + '&batch=' +batch + '&v=' + Math.random());
  }

  createData(data: any): Observable<any>{
    return this.http.post(this.url + 'batch/csv.php', data)
  }
}
