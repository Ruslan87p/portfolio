import {Power4, TweenMax} from 'gsap/TweenMax';
import * as math from 'mathjs/dist/math';


export class FollowCursorOnHoverService {

  el;
  hover;
  x;
  y;
  width;
  height;

  constructor(el?) {
    this.el = el;
    this.hover = false;

    this.calculatePosition();
    this.attachEventsListener();
  }

  attachEventsListener() {
    window.addEventListener('mousemove', e => this.onMouseMove(e));
    window.addEventListener('resize', e => this.calculatePosition(e));
  }

  calculatePosition(e?) {
    TweenMax.set(this.el, {
      x: 0,
      y: 0,
      scale: 1
    });
    const box = this.el.getBoundingClientRect();
    this.x = box.left + (box.width * 0.5);
    this.y = box.top + (box.height * 0.5);
    this.width = box.width;
    this.height = box.height;
  }

  onMouseMove(e) {
    let hover = false;
    const hoverArea = (this.hover ? 1 : 1);
    const x = e.clientX - this.x;
    const y = e.clientY - this.y;
    const distance = math.sqrt(x * x + y * y);
    if (distance < (this.width * hoverArea)) {
      hover = true;
      if (!this.hover) {
        this.hover = true;
      }
      this.onHover(e.clientX, e.clientY);
    }

    if (!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  }

  onHover(x, y) {
    TweenMax.to(this.el, 0.7, {
      x: (x - this.x) * 0.5,
      y: (y - this.y) * 0.5,
      // scale: 1.15,
      ease: Power4.easeOut
    });
    this.el.style.zIndex = 10;
  }

  onLeave() {
    TweenMax.to(this.el, 0.7, {
      x: 0,
      y: 0,
      // scale: 1,
      ease: Power4.easeOut
    });
    this.el.style.zIndex = 1;
  }

  off() {
    window.removeEventListener('mousemove', e => this.onMouseMove(e));
    window.removeEventListener('resize', e => this.calculatePosition(e));
  }
}
