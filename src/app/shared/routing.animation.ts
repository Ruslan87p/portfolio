import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const routeChangeAnimation = trigger('routeChangeAnimation', [
  // transition('* <=> *', [
  //   // style({ position: 'relative' }),
  //   query(':enter, :leave', [
  //     style({
  //       opacity: 1,
  //       transform: 'scale(1)'
  //     })
  //   ], {optional: true}),
  //   query(':enter', [style({
  //     transform: 'scale(1.050)',
  //     opacity: 0
  //   })], {optional: true}),
  //   query(':leave', animateChild(), {optional: true}),
  //   query(':enter', animateChild(), {optional: true}),
  //   group([
  //     query(':leave', [animate('300ms ease-out', style({ opacity: 0}))], {optional: true}),
  //     query(':enter', [animate('300ms ease-out', style({ opacity: 1}))], {optional: true})
  //   ])
  // ])
]);
