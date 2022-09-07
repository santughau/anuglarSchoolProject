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
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }
  getProfile(id?:any):Observable<any> {    
    return this.http.get(this.url + 'profile/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateProfile(data: any): Observable<any> {
    return this.http.post(this.url + 'profile/update.php', data);    
  }
}
