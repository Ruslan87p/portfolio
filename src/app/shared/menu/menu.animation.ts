import {animate, state, style, transition, trigger} from '@angular/animations';

export const menuAnimation1 = trigger('menuAnimation1', [
  state('in', style({
    opacity: 1,
    transform: 'translate(0, 0)',
    visibility: 'visible',
  })),
  transition('in => out', [
    animate('700ms 500ms cubic-bezier(0.86, 0, 0.07, 1)')
  ]),
  state('out', style({
    opacity: 0,
    transform: 'translate(-10px, 0)',
    visibility: 'hidden',
  })),
  transition('out => in', [
    animate('1s 2000ms cubic-bezier(0.86, 0, 0.07, 1)'),
  ])

]);



export const menuAnimation2 = trigger('menuAnimation2', [
  state('in', style({
    opacity: 1,
    transform: 'translate(0, 0)',
    visibility: 'visible',
  })),
  transition('in => out', [
    animate('700ms 600ms cubic-bezier(0.86, 0, 0.07, 1)')
  ]),
  state('out', style({
    opacity: 0,
    transform: 'translate(-10px, 0)',
    visibility: 'hidden',
  })),
  transition('out => in', [
    animate('1s 2100ms cubic-bezier(0.86, 0, 0.07, 1)')
  ])
]);



export const menuAnimation3 = trigger('menuAnimation3', [
  state('in', style({
    opacity: 1,
    transform: 'translate(0, 0)',
    visibility: 'visible',
  })),
  transition('in => out', [
    animate('700ms 700ms cubic-bezier(0.86, 0, 0.07, 1)')
  ]),
  state('out', style({
    opacity: 0,
    transform: 'translate(-10px, 0)',
    visibility: 'hidden',
  })),
  transition('out => in', [
    animate('1s 2200ms cubic-bezier(0.86, 0, 0.07, 1)')
  ])
]);
