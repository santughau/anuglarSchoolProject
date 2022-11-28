/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Gallery } from '../gallery.model';
import { ImageCroppedEvent, LoadedImage, ImageTransform, ImageCropperComponent, base64ToFile } from 'ngx-image-cropper';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';



@Component({
  selector: 'app-gallery-create',
  templateUrl: './gallery-create.component.html',
  styleUrls: ['./gallery-create.component.css']
})
export class GalleryCreateComponent implements OnInit {
  myfile:any = '';
  rotateStatus: boolean = false;
  flipHorizontalStatus: boolean = false;
  discardChangesStatus: boolean = false;
  flipVerticalStatus: boolean = false;
  @ViewChild('cropper') cropper!: ImageCropperComponent;
  @ViewChild('lgModal') lgModal!: any;
  displayImg : any ="user.jpg"
  imageChangedEvent: any = '';
  croppedImage: any = '../../assets/student/8.jpg';
  transform: ImageTransform = {};
  gallery: Gallery = {
    galleryId: '',
    galleryImage: '',
    galleryTitle: ''
  }
  constructor(private router : Router,  public appService: SharedServiceService) { }

  ngOnInit(): void {
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
 
   saveImage() {   
     this.lgModal.hide();
     console.log(this.myfile);
     const formData = new FormData();
     formData.append('file', this.myfile);
     formData.append('title', this.gallery.galleryTitle);
     console.log( formData);     
     /* const upload$ = this.http.post("http://localhost/ranjana/gallery/santu.php", formData);
     const ok = upload$.subscribe();
     if (ok) {
       this.router.navigate(['gallery/galleryList'])
     } */
     this.appService.postMethod('gallery/create.php', formData).subscribe((res) => {
       if (res.status == "success") {
         this.appService.successMsg('Image Uploaded Successfully!', 'Weldone !');
         this.router.navigate(['gallery/galleryList'])
       } else {
         this.appService.errorsMsg('Image not  Uploaded Successfully!', 'OOPS Try Again !');
       }
     });     
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

}
