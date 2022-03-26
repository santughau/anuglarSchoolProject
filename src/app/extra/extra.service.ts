import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from './complaints.model';
import { Registration } from './registrtation.model';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  constructor(private http: HttpClient) { }
}
