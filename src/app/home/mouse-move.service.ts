import {TweenMax, Power2} from 'gsap/TweenMax';


export class MouseMoveService {

  relX = 0;
  relY = 0;
  movement = -20;

  constructor(e, svg?) {

    svg.forEach( (item) => {
      this.relX = e.pageX;
      this.relY = e.pageY;

      TweenMax.to(item, 10, {
        x: (this.relX - item.clientWidth / 2) / item.clientWidth * this.movement,
        y: (this.relY - item.clientHeight / 2) / item.clientHeight * this.movement,
        ease: Power2.easeOut
      });
    });

  }


}
