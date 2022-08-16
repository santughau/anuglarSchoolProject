import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SubjectModel } from './subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  url = "http://localhost/ranjana/";
  url1 = "https://bpegm.in/angular/";
  constructor(private http: HttpClient) { }

  getAllClass(): Observable<any> {
    return this.http.get(this.url + 'classlist/read.php?v=' + Math.random())
  }


  createSubject(data1: any): Observable<any> {
    console.log('sere' + data1);
    return this.http.post(this.url + 'subjectmodel/create.php', data1)
  }

  getSubjectClassWise(id:any):Observable<any> {
    //return this.http.post(this.url + 'subjectmodel/read_one.php', data)
    return this.http.get(this.url + 'subjectmodel/read_By_subjectClassId.php?id=' + id + '&v=' + Math.random());
  }


  getAllSubject(): Observable<any> {
    return this.http.get(this.url + 'subjectmodel/read.php?v=' + Math.random())
  }

  deleteSubject(data:any): Observable<any> {
    return this.http.post(this.url + 'subjectmodel/delete.php', data)
  }

  updateSubject(data: any): Observable<any> {
    console.log("Id From Service " + JSON.stringify(data));
    return this.http.post(this.url + 'subjectmodel/update.php', data);    
  }

  getSingleSubject(id: any): Observable<any> {
    return this.http.get(this.url + 'subjectmodel/read_one.php?id=' + id + '&v=' + Math.random());
  }

  
}
