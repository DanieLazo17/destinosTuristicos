import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFondo]'
})
export class FondoDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    //this.darFondo('#2e8b57');
    this.darFondo('#000000');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.darFondo('');
  }
  
  private darFondo(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
