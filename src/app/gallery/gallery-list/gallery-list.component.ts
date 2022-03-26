import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gallery } from '../gallery.model';
import { GalleryService } from '../gallery.service';
@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {

  constructor(private router : Router, private service :GalleryService) { }

  ngOnInit(): void {
  }

}
