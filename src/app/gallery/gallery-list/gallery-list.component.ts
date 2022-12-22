/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Gallery } from '../gallery.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  modalRef?: BsModalRef;
  gallery: Gallery[] = [];
  currentPage = 1;
  page?: number;
  total_rows: number;
  showBoundaryLinks = true;
  pageBtnClass:any = 'bg-danger'
  constructor(private router : Router, private modalService: BsModalService,public appService: SharedServiceService) { }

  ngOnInit(): void {
   // this.getData();
   this.appService.showSpinner();
    this.appService.getMethod('gallery/read.php?pageno=' + this.currentPage).subscribe((data) => {
      this.gallery = data.document;
      this.total_rows = data.total_rows;
      console.log(this.total_rows);
      console.log(data);
      this.appService.hideSpinner();
    });
  }

  /* getData() {    
    this.appService.showSpinner();
    this.appService.getMethod('gallery/read.php').subscribe((data) => {
      this.gallery = data.document;
      console.log(this.gallery);
      this.appService.hideSpinner();
    });
  } */

  pageChanged(event: PageChangedEvent | any): void {
    this.page = event.page;
    console.log(this.page);
   // this.gallery = [];
   this.appService.showSpinner();
    this.appService.getMethod('gallery/read.php?pageno=' + this.page).subscribe((data) => {
      this.gallery = data.document;
      console.log(this.gallery);
      this.appService.hideSpinner();
    });
  }

  editGallery(id:any) {
    console.log(id);
    this.router.navigate(['gallery/galleryEdit', id]);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id: any): void {
    this.appService.showSpinner();
    console.log(id); 
    const data = {
      'galleryId' : id
    }
    this.appService.postMethod('gallery/delete.php',data).subscribe(res => {
      if (res.status == 'success') {
        this.appService.showSpinner();        
        this.appService.successMsg('Gallery Deleted Successfully!', 'Weldone !');
        this.modalRef?.hide();
       this.router.navigate(['/gallery/galleryCreate']);     
      } else {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Gallery was not  Deleted Successfully!', 'OOPs Try Again !');
        this.modalRef?.hide();      }
      this.modalRef?.hide();
      this.router.navigate(['/gallery/galleryCreate'])
    });    
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
