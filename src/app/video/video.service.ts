/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  /* createVideo(data: any): Observable<any> {
    return this.http.post(this.url + 'video/create.php', data,)
  }

  getAllVideo(id:any): Observable<any> {
    return this.http.get(this.url + 'video/read.php?id=' + id + '&v=' + Math.random())
  }

  deleteVideo(data:any): Observable<any> {
    return this.http.post(this.url + 'video/delete.php', data)
  }

  getSingleVideo(id:any):Observable<any> {    
    return this.http.get(this.url + 'video/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateVideo(data: any): Observable<any> {
    return this.http.post(this.url + 'video/update.php', data);    
  } */
}
