import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Gallery } from '../gallery.model';
import { GalleryService } from '../gallery.service';
import { ImageCroppedEvent, LoadedImage, ImageTransform, ImageCropperComponent, base64ToFile } from 'ngx-image-cropper';
@Component({
  selector: 'app-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.css']
})
export class GalleryEditComponent implements OnInit {
  myfile:any = '';
  rotateStatus: boolean = false;
  flipHorizontalStatus: boolean = false;
  discardChangesStatus: boolean = false;
  flipVerticalStatus: boolean = false;
  @ViewChild('cropper') cropper!: ImageCropperComponent;
  @ViewChild('lgModal') lgModal!: any;
  displayImg : any ="user.jpg"
  imageChangedEvent: any = '';
  croppedImage: any ;
  transform: ImageTransform = {};
  galleryId: any;
  gallery: Gallery = {
    galleryId: '',
    galleryImage: '',
    galleryTitle: ''
  }
  constructor(private router: Router,private spinner: NgxSpinnerService, private toastr: ToastrService, private service: GalleryService,private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.show();
    this.galleryId = this._route.snapshot.paramMap.get('id');
    console.log("galleryId = " + this.galleryId);
    this.service.getSingleGallery(this.galleryId).subscribe((data) => {      
      this.gallery = data.document;
      this.croppedImage = "http://localhost/ranjana/gallery/images/" + this.gallery.galleryImage + ".jpg"
      console.log(this.croppedImage);
      this.spinner.hide();
    })
  }

  fileChangeEvent(event: any): void {   
    // console.log(event);
    // console.log(event.target.files[0].name);
       this.imageChangedEvent = event;
   }
   imageCropped(event: ImageCroppedEvent) {
     this.croppedImage = event.base64;
     console.log(this.croppedImage);
     
    // this.myfile = base64ToFile(this.croppedImage);
   
    this.myfile = this.dataURLtoFile(this.croppedImage, 'gallery.jpg');     
   }
   imageLoaded(image?: LoadedImage) {
       // show cropper
   }
   cropperReady() {
       // cropper ready
   }
   loadImageFailed() {
       // show message
   }


 

  dataURLtoFile(dataurl:any, filename:any) { 
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }    
    return new File([u8arr], filename, {type:mime});
}

  rotate() {
    this.rotateStatus = true;
    this.flipHorizontalStatus = false;
    this.flipVerticalStatus = false;
    this.discardChangesStatus = false;
    const newValue = ((this.transform.rotate ?? 0) + 90) % 360;
    this.transform = {
      ...this.transform,
      rotate:newValue
    }
  }

  flipHorizontal() {
    this.rotateStatus = false;
    this.flipHorizontalStatus = true;
    this.flipVerticalStatus = false;
    this.discardChangesStatus = false;
    this.transform = {
      ...this.transform,
      flipH:!this.transform.flipH
    }
  }
  flipVertical() { 
    this.rotateStatus = false;
    this.flipHorizontalStatus = false;
    this.flipVerticalStatus = true;
    this.discardChangesStatus = false;
    this.transform = {
      ...this.transform,
      flipV:!this.transform.flipV
    }
  }
  discardChanges() {
    this.rotateStatus = false;
    this.flipHorizontalStatus = false;
    this.flipVerticalStatus = false;
    this.discardChangesStatus = true;
    this.lgModal.hide();
   
  }


  saveImage() {   
    this.lgModal.hide();
    console.log(this.myfile);
    const formData = new FormData();
    formData.append('file', this.myfile);
    formData.append('title', this.gallery.galleryTitle);
    formData.append('id', this.galleryId);
    console.log( formData);
    
    /* const upload$ = this.http.post("http://localhost/ranjana/gallery/santu.php", formData);
    const ok = upload$.subscribe();
    if (ok) {
      this.router.navigate(['gallery/galleryList'])
    } */


    this.service.updateGallery(formData).subscribe((res) => {
      if (res.status == "success") {
       this.toastr.success('Image Uploaded Successfully!', 'Weldone!', {
         timeOut: 3000,
         progressBar: true,
         progressAnimation: 'decreasing',
         closeButton: true,     
       });
       this.router.navigate(['gallery/galleryList'])
      } else {
       this.toastr.error('Image does not  Uploaded Successfully!', 'Try Again!', {
         timeOut: 3000,
         progressBar: true,
         progressAnimation: 'decreasing',
         closeButton: true,     
       });
     }
    })
    
  }

}
