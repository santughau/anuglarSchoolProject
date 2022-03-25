import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-quiz-add-question',
  templateUrl: './quiz-add-question.component.html',
  styleUrls: ['./quiz-add-question.component.css']
})
export class QuizAddQuestionComponent implements OnInit {

  tinyObject = {
    height: 150,
    menubar: true,
    image_advtab: true,
    imagetools_toolbar:
      'rotateleft rotateright | flipv fliph | editimage imageoptions',

    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount '
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help styleselect '
  }

 
  addForm: FormGroup
  question = new FormControl('');
  ans = new FormControl('');
  optionA = new FormControl('');
  optionB = new FormControl('');
  optionC = new FormControl('');
  optionD = new FormControl('');
  constructor() {
    this.addForm = new FormGroup({
      ans: this.ans,
      question: this.question,
      optionA: this.optionA,
      optionB: this.optionB,
      optionC: this.optionC,
      optionD: this.optionD
    })
  }

  ngOnInit(): void {
  }

  addPost() {
    console.log(this.addForm.value);
  }
  
}
