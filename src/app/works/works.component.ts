import {Component, OnInit} from '@angular/core';
import {WorksDataService} from './works-data.service';
import {transitionAnimation} from '../transition-animation';
import {transitionAnimationDigit, transitionAnimationLink, transitionAnimationText} from './works.animation';
import {RunSlider} from './work-horizontal-slider';
import {CursorService} from '../cursor.service';
import {TimelineLite} from 'gsap/TweenMax';
import {Router} from '@angular/router';
import * as math from 'mathjs/dist/math';


@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css'],
  animations: [
    transitionAnimation,
    transitionAnimationLink,
    transitionAnimationDigit,
    transitionAnimationText
  ]
})
export class WorksComponent implements OnInit {

  highlight;
  worksList = [];
  settings;
  state;
  id;
  links;
  planes;

  constructor(private worksSvc: WorksDataService,
              private router: Router) {
  }


  onClickProject(id) {
    const tl = new TimelineLite();

    const isComplete = () => {
      this.router.navigate(['/works/' + id]);
    };

    tl.fromTo('.viewport-overlay', 0.5, {
      opacity: 1,
      transform: 'translateY(0)',
      ease: 'cubic-bezier(.94,.01,.06,1)',
    }, {
      opacity: 0,
      transform: 'translateY(30px)',
      ease: 'cubic-bezier(.94,.01,.06,1)',
      onComplete: isComplete
    });
  }


  ngOnInit() {

    this.highlight = document.getElementById('highlight');
    this.planes = document.getElementById('planes');

    setTimeout(() => {
      this.links = document.querySelectorAll('a');
      new CursorService(this.links);
    }, 1000);




    window.addEventListener('mouseup', () => {
      // const max = 100;

      // Get css translateX
      const style = window.getComputedStyle(this.planes);
      const matrix = new WebKitCSSMatrix(style.transform);

      const buuu = math.abs((math.round((matrix.m41 * 1000) / 100) / 100)) / 100 * 10;
      math.round(buuu);
      console.log(math.round(buuu), 'buuu');

      // const buuu2 = math.min(max, math.max(0, buuu));
      // console.log(buuu2);

      this.highlight.style.width = buuu + '%';
    });


    new RunSlider();


    this.settings = {
      reverse: true,                              // reverse the tilt direction
      max: 3,                                     // max tilt rotation (degrees)
      startX: 0,                                  // the starting tilt on the X axis, in degrees.
      startY: 0,                                  // the starting tilt on the Y axis, in degrees.
      perspective: 1000,                          // Transform perspective, the lower the more extreme the tilt gets.
      scale: 1.03,                                // 2 = 200%, 1.5 = 150%, etc..
      speed: 1000,                                // Speed of the enter/exit transition
      transition: true,                           // Set a transition on enter/exit.
      axis: null,                                 // What axis should be disabled. Can be X or Y.
      reset: true,                                // If the tilt effect has to be reset on exit.
      easing: 'cubic-bezier(.03,.98,.52,.99)',    // Easing on enter/exit.
      glare: false,                               // if it should have a "glare" effect
    };

    this.worksSvc.getProducts()
      .subscribe(items => {
        this.worksList = items;
        this.id = items.id;
      });


  }


}