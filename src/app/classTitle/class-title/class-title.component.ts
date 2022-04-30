import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassTitleService } from '../class-title.service';
import { ClassList } from '../classList.model';


@Component({
  selector: 'app-class-title',
  templateUrl: './class-title.component.html',
  styleUrls: ['./class-title.component.css']
})
export class ClassTitleComponent implements OnInit {

  classList: ClassList = {
    className: ''
  }
  constructor(private spinner: NgxSpinnerService, private router: Router, private service: ClassTitleService, private toastr: ToastrService, ) { }

  ngOnInit(): void {
   
  }
  saveClass(classForm: any) {
    this.spinner.show();   
    const data = {
      'className': this.classList.className
    }
    classForm.form.reset();
    this.service.createClass(data).subscribe((res) => {
      this.spinner.hide(); 
      this.router.navigate(['/class/classList'])
    })
    this.toastr.success('Class Created Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
     
    });

  }

  



  
}
