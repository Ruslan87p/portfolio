import {Component, OnDestroy, OnInit} from '@angular/core';
import * as math from 'mathjs/dist/math';

import {CursorService} from '../cursor.service';
import {transitionAnimation} from '../transition-animation';
import {Smooth} from './scroll-skew';
import {TimelineLite} from 'gsap/TweenMax';
import { LazyLoadingImg } from '../works/work/inters.observable';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    transitionAnimation
  ]
})
export class AboutComponent implements OnInit, OnDestroy {

  squarePaallax;
  isMobile = true;

  constructor() {
  }

  ngOnInit() {
    if(window.innerWidth > 700) {

      this.isMobile = false;
      const highlight = document.getElementById('highlight');
      const links = document.querySelectorAll('a');

      this.squarePaallax = document.querySelectorAll('.parralax');
      new LazyLoadingImg(this.squarePaallax);

      this.squarePaallax.forEach((i) => {
        new Smooth(highlight, i);
      })
      new CursorService(links);

    }

  }


  ngOnDestroy() {
    window.clearTimeout();
    new Smooth().off();
  }

}

