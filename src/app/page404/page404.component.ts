import {Component, OnInit} from '@angular/core';
import {CursorService} from '../cursor.service';
import {GlitchCalculation} from './glitch-effect';
// import {FollowCursorOnHoverService} from '../shared/follow-cursor-on-hover.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  links;
  canvas;

  constructor() { }

  ngOnInit() {

    this.links = document.querySelectorAll('a');
    console.log(this.links);
    new CursorService(this.links);


    this.canvas = document.getElementById('canvas-webgl');
    new GlitchCalculation(this.canvas);

    // new FollowCursorOnHoverService(this.links);
  }


}
