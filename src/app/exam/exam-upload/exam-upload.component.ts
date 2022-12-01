/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import * as XLSX from 'xlsx';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-exam-upload',
  templateUrl: './exam-upload.component.html',
  styleUrls: ['./exam-upload.component.css']
})
export class ExamUploadComponent implements OnInit {
  examId: any;
  batchId: any;
  public tableData: any;
  allStudentList: any[] = [];
  constructor(private router: Router,  private _route: ActivatedRoute, public appService: SharedServiceService ,private excelService: ExcelServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.examId = this._route.snapshot.paramMap.get('id');
    console.log(this.examId);

    this.batchId = this._route.snapshot.paramMap.get('batch');
    console.log(this.batchId);
    this.appService.getMethod('result/read.php?id=' + this.examId + '&batch=' +this.batchId).subscribe((data) => {
      console.log(data);
      this.allStudentList = data.document;
      console.log(this.allStudentList);
      this.appService.hideSpinner();
    });

    
  }

  exportAsXLSX(): void {
    let batchNumber = 'Batch Number-' + this.batchId;
    this.excelService.exportAsExcelFile(this.allStudentList, batchNumber);
  }



  uploadData(e: any) {
    console.log(e);

    if (e.target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      console.log(binarystr);

      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      this.tableData = data;

      console.log(this.tableData);

    }
  }

  uploadDataInPhp() {
    this.appService.postMethod('batch/csv.php',this.tableData).subscribe((data) => {
      console.log(data);
      if (data.code == 1) {
        this.router.navigate(['exam/examList']);
        this.appService.successMsg('Result Uploaded Successfully!', 'Weldone!');
      }
    });
  }
}
