import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassList } from './classList.model';

@Injectable({
  providedIn: 'root'
})
export class ClassTitleService {

  constructor(private http: HttpClient) { }
}
