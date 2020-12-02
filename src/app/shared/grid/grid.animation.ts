import {animate, state, style, transition, trigger} from '@angular/animations';


export const gridChangeAnimation = trigger('gridChangeAnimation', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 800ms cubic-bezier(.94,.01,.06,1)')
  ]),
  state('out', style({
    width: '33.33333%'
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
    width: '33.33333%'
  })),
  transition('out => in', [
    animate('1000ms 800ms cubic-bezier(.91,0,.1,1)')
  ]),

]);













export const gridChangeAnimationMobile1 = trigger('gridChangeAnimationMobile1', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 700ms cubic-bezier(.94,.01,.06,1)')
  ]),
  state('out', style({
    width: '100%'
  })),
  transition('out => in', [
    animate('1000ms 1100ms cubic-bezier(.94,.01,.06,1)')
  ]),
]);
export const gridChangeAnimationMobile2 = trigger('gridChangeAnimationMobile2', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 900ms cubic-bezier(.94,.01,.06,1)')
  ]),
  state('out', style({
    width: '100%'
  })),
  transition('out => in', [
    animate('1000ms 1300ms cubic-bezier(.94,.01,.06,1)')
  ]),
]);
export const gridChangeAnimationMobile3 = trigger('gridChangeAnimationMobile3', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 1100ms cubic-bezier(.94,.01,.06,1)')
  ]),
  state('out', style({
    width: '100%'
  })),
  transition('out => in', [
    animate('1000ms 1500ms cubic-bezier(.94,.01,.06,1)')
  ]),
]);





export const gridChangeAnimationInnerMobile1 = trigger('gridChangeAnimationInnerMobile1', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 1100ms cubic-bezier(.91,0,.1,1)')
  ]),
  state('out', style({
    width: '100%'
  })),
  transition('out => in', [
    animate('1000ms 700ms cubic-bezier(.91,0,.1,1)')
  ]),
]);
export const gridChangeAnimationInnerMobile2 = trigger('gridChangeAnimationInnerMobile2', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 1300ms cubic-bezier(.91,0,.1,1)')
  ]),
  state('out', style({
    width: '100%'
  })),
  transition('out => in', [
    animate('1000ms 900ms cubic-bezier(.91,0,.1,1)')
  ]),
]);
export const gridChangeAnimationInnerMobile3 = trigger('gridChangeAnimationInnerMobile3', [
  state('in', style({
    width: '0'
  })),
  transition('in => out', [
    animate('1000ms 1500ms cubic-bezier(.91,0,.1,1)')
  ]),
  state('out', style({
    width: '100%'
  })),
  transition('out => in', [
    animate('1000ms 1100ms cubic-bezier(.91,0,.1,1)')
  ]),
]);