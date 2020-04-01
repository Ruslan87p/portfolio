import {Component, OnInit} from '@angular/core';
import * as math from 'mathjs/dist/math';

import {CursorService} from '../cursor.service';
import {transitionAnimation} from '../transition-animation';
import {Smooth} from './scroll-skew';


// This feature solves a lot of headaches and waste of money related to the app’s performance.
// It helps to, and allows to, load modules dynamically. In other words, on-demand by using
// promises or the async/await syntax. A shot of this would be:

// import("./math").then(math => {
//   console.log(math.add(16, 26));
// });

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [transitionAnimation]
})
export class AboutComponent implements OnInit {

  // @HostBinding('@fade') anim = true;
  scrollY;
  currentState;
  pageHeight;
  scrollStatePercentage;
  onScroll;

  constructor() {
  }


  ngOnInit() {

    const highlight = document.getElementById('highlight');
    const links = document.querySelectorAll('a');

    new CursorService(links);
    new Smooth();


    this.onScroll = () => {
      // progress bar
      this.currentState = document.body.scrollTop || document.documentElement.scrollTop;
      this.pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.scrollStatePercentage = (this.currentState / this.pageHeight) * 100;
      highlight.style.width = this.scrollStatePercentage + '%';

      this.scrollY = math.round(this.scrollStatePercentage);

    };
    window.addEventListener('scroll', this.onScroll);


    // get each letter wrapper by span
    // for (let i = 0; i < this.text.length; i++) {
    //   this.newDom += '<span class="char">' + (this.text[i] === ' ' ? '&nbsp;' : this.text[i]) + '</span>';
    // }
    // this.text = this.newDom;


  }

}

