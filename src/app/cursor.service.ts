import {TweenMax} from 'gsap/TweenMax';

export class CursorService {

  constructor(links) {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let posX = 0, posY = 0;
    let mouseXf = 0, mouseYf = 0;

    TweenMax.to({}, 0.016, {
      repeat: -1,
      onRepeat: () => {
        posX += (mouseXf - posX) / 9;
        posY += (mouseYf - posY) / 9;

        TweenMax.set(follower, {
          css: {
            left: posX - 14,
            top: posY - 14,
          },
        });

        TweenMax.set(cursor, {
          css: {
            left: mouseXf,
            top: mouseYf
          }
        });
      }
    });


    document.addEventListener('mousemove', e => {
      mouseXf = e.clientX;
      mouseYf = e.clientY;
    });




    // if (links.length) {
      for (let i = 0; i < links.length; i++) {
        const selfLink = links[i];
        selfLink.addEventListener('mouseenter', () => {
          cursor.classList.add('active');
          follower.classList.add('cursor-follower-active');
          follower.classList.remove('cursor-follower-isActive');
        });
        selfLink.addEventListener('mouseleave', () => {
          cursor.classList.remove('active');
          follower.classList.remove('cursor-follower-active');
          follower.classList.add('cursor-follower-isActive');
        });

      }
    // }

  }

}
