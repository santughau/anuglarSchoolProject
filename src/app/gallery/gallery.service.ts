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
import { Gallery } from './gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  url = "http://localhost/ranjana/";
  constructor(private http: HttpClient) { }

 /*  createGallery(data: any): Observable<any> {
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
  } */
}
