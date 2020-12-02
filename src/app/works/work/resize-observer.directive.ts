import { Directive, ElementRef, OnDestroy } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';


@Directive({
  selector: '[appResizeObserver]'
})

export class ResizeObserverDirective implements OnDestroy {

  resizeObs;


  constructor(private el: ElementRef) {
    
    if (window.innerWidth > 700) {
          //  Make observer on content container to get height of content and assing it to body
    this.resizeObs = new ResizeObserver(entries => {
      for (const entry of entries) {
          document.body.style.height = entry.contentRect.height + 'px';    
      }
    });
    this.resizeObs.observe(this.el.nativeElement);
    }

  }

  
  ngOnDestroy() {
    if (window.innerWidth > 700) {
    this.resizeObs.unobserve(this.el.nativeElement);
    }
  }


}
