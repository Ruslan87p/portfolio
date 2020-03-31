import {animate, state, style, transition, trigger} from '@angular/animations';


export const gridChangeAnimation = trigger('gridChangeAnimation', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 800ms cubic-bezier(.94,.01,.06,1)')
  ]),
  state('out', style({
    width: '33.3%'
  })),
  transition('out => in', [
    animate('1000ms 1500ms cubic-bezier(.94,.01,.06,1)')
  ]),

]);



export const gridChangeAnimationInner = trigger('gridChangeAnimationInner', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 1500ms cubic-bezier(.91,0,.1,1)')
  ]),
  state('out', style({
    width: '33.3%'
  })),
  transition('out => in', [
    animate('1000ms 800ms cubic-bezier(.91,0,.1,1)')
  ]),

]);
