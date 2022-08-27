import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery } from './gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

  createGallery(data: any): Observable<any> {
    return this.http.post(this.url + 'gallery/create.php', data,)
  }
}
