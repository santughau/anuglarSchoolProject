import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassTitleService } from '../class-title.service';
import { ClassList } from '../classList.model';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit, OnDestroy, AfterViewInit {
  /* dtOptions: any = {
    pageLength: 5
  }; */
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  record: any[] = [];
  constructor(private spinner: NgxSpinnerService, private router: Router, private service: ClassTitleService, private toastr: ToastrService, private excelService: ExcelServiceService) { }

  ngOnInit(): void {
    this.getData()
    this.dtOptions = {
      data : this.record,
      pagingType: 'full_numbers',
      pageLength: 2, responsive: true,
      lengthMenu: [5, 15, 25],
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
     

    };
     
  }

  ngAfterViewInit(): void {

    this.dtTrigger.next(true);

    this.getData();
  }


  getData() {

    this.record = [];
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.record = data.document.records;
      this.dtTrigger.next(true);

      this.spinner.hide();
    })
  }
  editClass(i: any) {
    console.log(i);
    this.router.navigate(['class/classEdit', i])
  }

  deleteClass(i: any) {
    console.log(i);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.record, 'ClassList');
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
