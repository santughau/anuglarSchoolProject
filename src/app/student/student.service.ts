import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  createStudent(data: any): Observable<any> {
    return this.http.post(this.url + 'student/create.php', data,)
  }

  getAllStudents(id:any):Observable<any> {    
    return this.http.get(this.url + 'student/read.php?id=' + id + '&v=' + Math.random());
  }

  deleteStudent(data: any): Observable<any> {
    return this.http.post(this.url + 'student/delete.php', data)
  }

  getSingleStudent(id:any):Observable<any> {    
    return this.http.get(this.url + 'student/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateStudent(data: any): Observable<any> {
    return this.http.post(this.url + 'student/update.php', data);    
  }

  
}
