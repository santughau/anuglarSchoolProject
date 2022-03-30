import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gallery } from '../gallery.model';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-gallery-create',
  templateUrl: './gallery-create.component.html',
  styleUrls: ['./gallery-create.component.css']
})
export class GalleryCreateComponent implements OnInit {
  gallery: Gallery = {
    galleryId: '',
    galleryImage: '',
    galleryTitle: ''
  }
  constructor(private router: Router, private service: GalleryService) { }

  ngOnInit(): void {
  }

}
