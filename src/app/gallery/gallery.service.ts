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

  getAllGallery(): Observable<any> {
    return this.http.get(this.url + 'gallery/read.php?v=' + Math.random())
  }

  getAll(pageno:any): Observable<any> {
    return this.http.get(
      this.url + 'gallery/read.php?pageno=' + pageno
    );
  }

  deleteGallery(data:any): Observable<any> {
    return this.http.post(this.url + 'gallery/delete.php', data)
  }


  getSingleGallery(id:any):Observable<any> {    
    return this.http.get(this.url + 'gallery/read_one.php?id=' + id + '&v=' + Math.random());
  }

  updateGallery(data: any): Observable<any> {
    return this.http.post(this.url + 'gallery/update.php', data);    
  }
}
