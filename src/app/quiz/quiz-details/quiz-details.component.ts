import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from '../quiz.model';
@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  questions: any = []
  quizId: any = '';

  constructor(private router: Router, private service: QuizService, private spinner: NgxSpinnerService, private _route: ActivatedRoute, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.quizId = this._route.snapshot.paramMap.get('id');
    this.spinner.hide();

    this.service.getAllQuestions(this.quizId).subscribe((data) => {
      this.questions = data.document;
      console.log(this.questions);
      
      this.spinner.hide();
    })
  }

  editQuestions(id: any) {
    
  }

  deleteQuestions(id: any) {
    
  }

}
