import {animate, style, transition, trigger} from '@angular/animations';

// WORKS
export const transitionAnimation = trigger('transitionAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(30px)'
    }),
    animate('1200ms 500ms cubic-bezier(.94,.01,.06,1)', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ])
]);
