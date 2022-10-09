import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from '../messages.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-create',
  templateUrl: './messages-create.component.html',
  styleUrls: ['./messages-create.component.css']
})
export class MessagesCreateComponent implements OnInit {
  spinner: boolean = true;
  messages: Messages = {
    messageId: '',
    messageStudentId: '',
    messageStudentName: '',
    messageClassId: '',
    messageBatchId: '',
    messageImage: '',
    messageText: ''
  }
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
  products = [
    { id: 1, studentName: 'Elenor Anderson', isSelected: false },
    { id: 2, studentName: 'Caden Kunze', isSelected: true },
    { id: 3, studentName: 'Ms. Hortense Zulauf', isSelected: true },
    { id: 4, studentName: 'Grady Reichert', isSelected: false },
    { id: 5, studentName: 'Dejon Olson', isSelected: false },
    { id: 6, studentName: 'Jamir Pfannerstill', isSelected: false },
    { id: 7, studentName: 'Aracely Renner DVM', isSelected: false },
    { id: 8, studentName: 'Genoveva Luettgen', isSelected: false }
  ];
  checkedPro: any[] = [];
  addForm: UntypedFormGroup
  body = new UntypedFormControl('');
  constructor(private router: Router, private service: MessagesService) {
    this.addForm = new UntypedFormGroup({
      body: this.body
    })
  }

  ngOnInit(): void {
  }
  addPost() {
    console.log(this.body);
  }

  checkAllCheckBox(ev: any) {
    this.products.forEach(x => x.isSelected = ev.target.checked)
  }

  isAllCheckBoxChecked() {
    return this.products.every(p => p.isSelected);
  }

  apply() {
    this.checkedPro = this.products.filter((e) => {
      return e.isSelected === true;
    }).map(ele => ele.id)
    console.log(this.checkedPro);
    this.checkedPro.forEach(number =>
      console.log(number)
    );
  }

}
