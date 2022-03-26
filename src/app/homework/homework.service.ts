import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Homework } from './homework.model';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  constructor(private http: HttpClient) { }
}
