import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expences } from './expences.model';

@Injectable({
  providedIn: 'root'
})
export class ExpencesService {

  constructor(private http: HttpClient) { }
}
