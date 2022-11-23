import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import { ExamService } from '../exam.service';
import * as XLSX from 'xlsx';
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
  constructor(private router: Router, private spinner: NgxSpinnerService, private _route: ActivatedRoute, private toastr: ToastrService, private service: ExamService, private excelService: ExcelServiceService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.examId = this._route.snapshot.paramMap.get('id');
    console.log(this.examId);


    this.batchId = this._route.snapshot.paramMap.get('batch');
    console.log(this.batchId);
    this.service.getStudentListForDownload(this.examId, this.batchId).subscribe((data) => {
      console.log(data);
      this.allStudentList = data.document;
      console.log(this.allStudentList);
      this.spinner.hide();
    })
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
    this.service.createData(this.tableData).subscribe((data) => {
      console.log(data);
      if (data.code == 1) {
        this.router.navigate(['exam/examList']);
        this.toastr.success('Result Uploaded Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
        });
      }

    })
  }

}
