import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Messages } from './messages.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  createMEssage(data: any): Observable<any> {
    return this.http.post(this.url + 'messages/create.php', data)
  }

  getAllMessages(id): Observable<any> {
    return this.http.get(this.url + 'messages/read.php?id=' + id + '&v=' + Math.random());
  }

  deleteMsg(data:any): Observable<any> {
    return this.http.post(this.url + 'messages/delete.php', data)
  }
}
