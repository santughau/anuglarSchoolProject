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

  createVideo(data: any): Observable<any> {
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
  }
}
