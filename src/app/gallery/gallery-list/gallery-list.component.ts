import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Gallery } from '../gallery.model';
import { GalleryService } from '../gallery.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  constructor(private router : Router, private service :GalleryService,private spinner: NgxSpinnerService, private toastr: ToastrService,private modalService: BsModalService,) { }

  ngOnInit(): void {
   // this.getData();
   this.service.getAll(this.currentPage).subscribe((data) => {
     this.gallery = data.document;
     this.total_rows = data.total_rows ;
     console.log(this.total_rows);
     
    console.log(data);     
    this.spinner.hide();
  })
  }
  getData() {    
    this.spinner.show();
    this.service.getAllGallery().subscribe((data) => {
      this.gallery = data.document;
      console.log(this.gallery);     
      this.spinner.hide();
    })
  }

  pageChanged(event: PageChangedEvent | any): void {
    this.page = event.page;
    console.log(this.page);
   // this.gallery = [];
    this.spinner.show();
    this.service.getAll(this.page).subscribe((data) => {
      this.gallery = data.document;
      console.log(this.gallery);     
      this.spinner.hide();
    })
  }

  editGallery(id:any) {
    console.log(id);
    this.router.navigate(['gallery/galleryEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id: any): void {
    this.spinner.show();
    console.log(id); 
    const data = {
      'galleryId' : id
    }
    this.service.deleteGallery(data).subscribe(res => {
      if (res.status == 'success') {
        this.spinner.hide();
        this.toastr.error('Gallery Deleted Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.modalRef?.hide();
       this.router.navigate(['/gallery/galleryCreate']);     
      } else {
        this.spinner.hide();
        this.toastr.error('Sorry Gallery Was not Deleted Successfully!', 'OOPs Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.modalRef?.hide();      }
      this.modalRef?.hide();
      this.router.navigate(['/gallery/galleryCreate'])
    });
    
    
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
