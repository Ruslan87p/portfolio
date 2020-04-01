import {animate, style, transition, trigger} from '@angular/animations';




export const transitionAnimationLink = trigger('transitionAnimationLink', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(30px)'
    }),
    animate('800ms 900ms cubic-bezier(0.86, 0, 0.07, 1)', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
]);


export const transitionAnimationText = trigger('transitionAnimationText', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(30px)'
    }),
    animate('700ms 800ms cubic-bezier(0.86, 0, 0.07, 1)', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
]);


export const transitionAnimationDigit = trigger('transitionAnimationDigit', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(30px)'
    }),
    animate('600ms 700ms cubic-bezier(.94,.01,.06,1)', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
  transition(':leave', [
    style({transform: 'scaleY(1)', height: '*'}),
    animate(1000, style({transform: 'scaleY(0)', height: '0'}))
  ])
]);
