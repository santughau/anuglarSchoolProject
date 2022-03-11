import { Component, OnInit,Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isFavorite: boolean = false;
  @ViewChild('el') elRefs?: ElementRef;
  constructor(private renderer: Renderer2, private elRef : ElementRef) { }

  ngOnInit(): void {
  }

  hideShow() {
    let el = this.elRef.nativeElement.querySelector(".navbar-collapse");
    let regex = 'show';
    let classes = el.getAttribute('class').split(' ');   // get all classes
    console.log(classes);
     classes.forEach((cl:any) => {
       if(cl.match(regex)){    // match classes b1, b2, b3....
         this.renderer.removeClass(el, cl);
       }
    });
    
  }

}
