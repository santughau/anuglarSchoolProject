import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  brandName = new Subject<any>()
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  getProfile(id?:any):Observable<any> {    
    return this.http.get(this.url + 'profile/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateProfile(data: any): Observable<any> {
    return this.http.post(this.url + 'profile/update.php', data);    
  }

}

