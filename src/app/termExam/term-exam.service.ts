import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Termexam } from './termexam.model';

@Injectable({
  providedIn: 'root'
})
export class TermExamService {

  constructor(private http: HttpClient) { }
}
