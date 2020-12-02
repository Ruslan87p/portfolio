import {Component, OnInit, OnDestroy} from '@angular/core';
import {CursorService} from '../cursor.service';
import { ImageTrail } from './image.trail.effects';



@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit, OnDestroy {

  links;
  canvas;

  
  scene;
  renderer;
  container;
  camera;
  animate;
  resize;
  mousemove;
  render;
  cube;
  onMove;
  onLeave;
  borderText;


  constructor() { }

  ngOnInit() {


    const links = document.querySelectorAll('a');
    new CursorService(links);
    new ImageTrail();

    this.borderText = document.querySelector('.border-text');

    this.onMove = () => {
      this.borderText.classList.add('bordered');
      this.borderText.classList.remove('filled');
    }

    this.onLeave = () => {
      this.borderText.classList.add('filled');
      this.borderText.classList.remove('bordered');
    }


    this.borderText.addEventListener('mouseenter', this.onMove);
    this.borderText.addEventListener('mouseleave', this.onLeave);




  }

  ngOnDestroy() {
    document.removeEventListener('mouseenter', this.onMove);
    document.removeEventListener('mouseleave', this.onLeave)
  }

}
