import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-messages-create',
  templateUrl: './messages-create.component.html',
  styleUrls: ['./messages-create.component.css']
})
export class MessagesCreateComponent implements OnInit {
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
  addForm: FormGroup
  body = new FormControl('');
  constructor() {
    this.addForm = new FormGroup({
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
