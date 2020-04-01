import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MouseMoveService} from './mouse-move.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  svg: any;
  svgRight: any;
  svgLeft: any;
  constructor() {}

  parallaxIt(e) {
    const svgEls = this.svg;
    new MouseMoveService(e, svgEls);
  }

  ngOnInit() {

    this.svgRight = document.querySelector('.shape-circle-1');
    this.svgLeft = document.querySelector('.shape-circle-2');

    this.svg = [this.svgRight, this.svgLeft];
  }

}
