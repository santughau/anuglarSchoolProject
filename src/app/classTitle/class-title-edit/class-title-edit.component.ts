import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassTitleService } from '../class-title.service';
import { ClassList } from '../classList.model';
@Component({
  selector: 'app-class-title-edit',
  templateUrl: './class-title-edit.component.html',
  styleUrls: ['./class-title-edit.component.css']
})
export class ClassTitleEditComponent implements OnInit {
  
  classList : ClassList = {
    classId: '',
    className: ''
  }
  constructor(private spinner: NgxSpinnerService,private router : Router, private service :ClassTitleService,private _route: ActivatedRoute,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.spinner.show();
    const id = this._route.snapshot.paramMap.get('id');
    this.spinner.show();
    this.service.getSingleClass(id).subscribe((data) => {
      //console.log(data);
      this.classList = data.document
      console.log(this.classList);
      this.spinner.hide();
    })
    
  }
  updateClass(classForm: any){
    console.log(this.classList);
    this.service.updateClass(this.classList).subscribe((res) => {
      this.spinner.hide(); 
      this.router.navigate(['/class/classList'])
    })

    this.toastr.success('Class Updated Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
     
    });
  
  }
}
