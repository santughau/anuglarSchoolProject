import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventList } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  createEvent(data: any): Observable<any> {
    return this.http.post(this.url + 'events/create.php', data,)
  }

  getAllEvents(): Observable<any> {
    return this.http.get(this.url + 'events/read.php?v=' + Math.random())
  }

  deleteEvents(data:any): Observable<any> {
    return this.http.post(this.url + 'events/delete.php', data)
  }

  getSingleEvent(id:any):Observable<any> {    
    return this.http.get(this.url + 'events/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateEvent(data: any): Observable<any> {
    return this.http.post(this.url + 'events/update.php', data);    
  }
}
