import {animate, state, style, transition, trigger, group} from '@angular/animations';

export const logoTransition = trigger('logoTransition', [
    state('out', style({
        opacity: 1,
        visibility: 'visible',
        transform: 'scale(1)'
    })),
    transition('in => out', [
        animate('500ms 500ms cubic-bezier(0.86, 0, 0.07, 1)')
    ]),
    state('in', style({
        opacity: 0,
        visibility: 'hidden',
        transform: 'scale(1.1)'
    })),
    transition('out => in', [
        animate('500ms 500ms cubic-bezier(0.86, 0, 0.07, 1)')
    ])
  ]);



  export const headerTransition = trigger('headerTransition', [
    state('out', style({
        opacity: 0,
        transform: 'translateY(-200px)'
    })),
    transition('in => out', [
        animate('500ms 500ms cubic-bezier(0.86, 0, 0.07, 1)')
    ]),
    state('in', style({
        opacity: 1,
        transform: 'translateY(0px)'
    })),
    transition('out => in', [
        animate('500ms 500ms cubic-bezier(0.86, 0, 0.07, 1)')
    ])
  ]);