import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  // This parameter is used to configure the amount of distance an element with this directive moves on a unit scroll.
  @Input('ratio') parallaxRatio = 1;

  // This property indicates the initial vertical position of the element on which the directive is applied.
  initialTop = 0.3;
  scrollY;

  constructor(private eleRef: ElementRef) {
      this.initialTop = this.eleRef.nativeElement.getBoundingClientRect().top;      
  }


  

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerWidth > 700) {

      this.scrollY = window.scrollY;
      this.eleRef.nativeElement.style.top = (this.initialTop - (this.scrollY * this.parallaxRatio)) + 'px';
      this.eleRef.nativeElement.style.transition = '0.1s ease';
      
    }
  }


}
