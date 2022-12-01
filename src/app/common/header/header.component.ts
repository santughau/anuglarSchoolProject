/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isFavorite: boolean = false;
  @ViewChild('el') elRefs?: ElementRef;
  profile: any = {};
  brandName: string = "Lax";
  constructor(private renderer: Renderer2, private elRef : ElementRef,public appService: SharedServiceService) { }

  ngOnInit(): void {
    console.log(this.appService.isUserLogin.value);
    
    this.appService.showSpinner();
    this.appService.getMethod('profile/read_one.php?id=1').subscribe((data) => {
      this.profile = data.document;
      this.appService.hideSpinner();
    });
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
  logOut() {
    this.appService.deleteToken();
  }
}
