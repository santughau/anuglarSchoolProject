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
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Student } from '../student.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Batch } from '../../batch/batch.model';
import { ImageCroppedEvent, LoadedImage, ImageTransform, ImageCropperComponent, base64ToFile } from 'ngx-image-cropper';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})


export class StudentCreateComponent implements OnInit {
  showTable: boolean = false;
  allClassList: any[] = [];
  allBatchList: any[] = [];
  batchId: any = null;
  classList: ClassList = {
    className: '',
    classId: 'select',
  }

  batch: Batch = {
    batchId: 'select',
    batchName: '',
    batchClass: '',
    batchDuration: '',
    batchFee: '',
    batchStartsFrom: new Date('Aug 22 2022 08:58:02 GMT+0530'),
    batchTime: ''
  }
  medium: any = {
    value: 'select',
    name:''
  }
  
  student: Student = {
    studentName: '',
    studentAddress: '',
    studentClass: '',
    studentBatch: '',
    studentMedium: '',
    studentGender: 'select',
    studentMobile: '',
    studentEmail: '',
    studentSchool: '',
    studentFee: '',
    studentPassword: '',
    studentMac: '',
    studentDob: new Date(),
    studentSubject: '',
    studentCompExam: '',
    studentImage: '',
    studentStatus: true,
    studentCreated: '',
  }

  mediumData: any = [
    {value:"Marathi" , name:"Marathi"},
    {value:"Semi" , name:"Semi"},
    {value:"CBSE" , name:"CBSE"},
  ]
  bsConfig?: Partial<BsDatepickerConfig>;

  today = new Date()
  selectedDates: DatepickerDateTooltipText[] = [{ date: new Date('2022-03-08'), tooltipText: 'Present' },
  { date: new Date('2022-03-09'), tooltipText: 'Absent' },
  { date: new Date('2022-03-07'), tooltipText: 'Present' }
  ];

  disabledDates = [
    new Date('2022-03-05'),
    new Date('2022-03-09')
  ];

  dropdownList = [];
  selectedItems:any = [];
  dropdownSettings = {};
  data: any = [];
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
  progress: number = 0;
  vaildFile: boolean = false;


  constructor(private router : Router,  public appService: SharedServiceService) {


  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    this.getAllClass();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'subjectId',
      textField: 'subjectName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'Please Select Class',
      //limitSelection:1
    };

  }

  getAllClass() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      this.appService.hideSpinner();
    });
  }

  loadBaches(ev?: any) {
    this.dropdownList = [];
    //console.log('this.selectedIte');    
    //console.log(this.selectedItems);    
    this.dropdownSettings = {
      ...this.dropdownSettings,
      clearSearchFilter : true
    }
   // this.onItemDeSelect()
    this.batch.batchId = 'select'
    this.batchId = ev.target.value;
   // const id = ev.target.value;
   this.appService.showSpinner();
    this.appService.getMethod('batch/read_By_ClassWiase.php?id=' +this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      if (this.allBatchList.length == 0) {
        this.showTable = false;
        console.log(this.showTable);
      } else {
        this.showTable = true;
      }
     // console.log(this.allBatchList);
     this.appService.hideSpinner();
      
    });
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id=' + id).subscribe((data) => {
      this.dropdownList = data.document;
      /*  const transformed = sub.map(({ subjectId, subjectName }) => ({ item_id: subjectId, item_text: subjectName }));
       console.log(transformed);
       this.dropdownList = transformed */
       this.appService.hideSpinner();
    });    
  }

  onItemSelect(item: any) {
   this.selectedItems.push(item)
   console.log(this.selectedItems);    
    var result = this.selectedItems.map((res) => {
      return res.subjectId;
    }).join(',')
    console.log(result);    
  }

  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = items;
    console.log(this.selectedItems);    
  }

  onItemDeSelect(items?: any) {
    this.removeSelected(items);
   // console.log(this.selectedItems);
  }

  removeSelected(itemSel: any) {
    //console.log(itemSel.subjectId);    
     this.selectedItems.forEach(item => {
      //console.log(item.subjectId);      
      if (itemSel.subjectId === item.subjectId) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
       }       
    }); 
    console.log(this.selectedItems);
  }

  onFilterChange(items?: any) {
    //console.log(items);
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

   saveStudent() {   
    this.appService.showSpinner();
    this.lgModal.hide();
    var result = this.selectedItems.map((res) => {
      return res.subjectId;
    }).join(',')
    console.log(result);    
    console.log(this.myfile);
    const formData = new FormData();
    formData.append('file', this.myfile);
    formData.append('studentName', this.student.studentName!);
    formData.append('studentAddress', this.student.studentAddress!);
    formData.append('studentClass', this.classList.classId as string);
    formData.append('studentBatch', this.batch.batchId as string);
    formData.append('studentMedium', this.medium.value!);
    formData.append('studentGender', this.student.studentGender!);
    formData.append('studentMobile', this.student.studentMobile!);
    formData.append('studentEmail', this.student.studentEmail!);
    formData.append('studentSchool', this.student.studentSchool!);
    formData.append('studentFee', this.student.studentFee!);
    formData.append('studentPassword', this.student.studentPassword!);
    formData.append('studentMac', this.student.studentMac!);
    formData.append('studentDob', this.student.studentDob!);
    formData.append('studentSubject', result);
    console.log( formData);
    
    this.appService.postMethod('student/create.php',formData).subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          var eventTotal = event.total ? event.total : 0;
          this.progress = Math.round(event.loaded / eventTotal * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('Image Upload Successfully!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);  
      }
      if (this.progress == 100) {
        this.router.navigate(['/student/students']);
      }
    });
    this.appService.successMsg('Student   Uploaded Successfully!', 'Weldone !');
  }
}
