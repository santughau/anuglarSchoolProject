import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gallery } from '../gallery.model';
import { GalleryService } from '../gallery.service';
@Component({
  selector: 'app-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.css']
})
export class GalleryEditComponent implements OnInit {
  spinner: boolean = true;
  gallery: Gallery = {
    galleryId: '',
    galleryImage: '',
    galleryTitle: ''
  }
  constructor(private router: Router, private service: GalleryService) { }

  ngOnInit(): void {
  }

}
