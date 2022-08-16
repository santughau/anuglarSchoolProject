import { Directive, ElementRef, Renderer2, Input, HostListener, HostBinding } from '@angular/core'

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {
  private elementSelected = false;
  constructor(private el: ElementRef) { }
  
  @HostListener('click')
  private onClick() {
    this.elementSelected = !this.elementSelected;
   
    if (this.elementSelected) {
      this.el.nativeElement.classList.add('toggle')
    } else {
      this.el.nativeElement.classList.remove('toggle')
    }
  }

}
