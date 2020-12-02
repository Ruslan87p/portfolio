import {animate, group, state, style, transition, trigger} from '@angular/animations';

// PORTRAIT
export const portraitAnimation = trigger('stateImg', [
  state('in', style({
    transform: 'translateY(0)',
    opacity: 1,
    visibility: 'visible'
  })),
  transition('in => out', [
    animate('1s 300ms cubic-bezier(0.86, 0, 0.07, 1)')
  ]),
  state('out', style({
    transform: 'translateY(50px)',
    opacity: 0,
    visibility: 'hidden'
  })),
  transition('out => in', [
    animate('1s 2400ms cubic-bezier(0.86, 0, 0.07, 1.2)')
  ]),

  // ENTER
  // transition(':enter', [
  //   style({
  //     transform: 'scale(1.1)',
  //     opacity: 0,
  //     visibility: 'hidden'
  //   }),
  //   animate('1000ms 300ms cubic-bezier(.87,.01,.13,1)', style({
  //     transform: 'scale(1)',
  //     visibility: 'visible',
  //     opacity: 1,
  //   }))
  // ]),
  // LEAVE
  transition(':leave', [
    animate('200ms 300ms cubic-bezier(.52,0,.49,.99)', style({ opacity: 0 }))
  ])
]);
// PORTRAIT




// LINE
export const lineAnimation = trigger('stateLine', [
  state('in', style({
    left: '0'
  })),
  transition('in => out', [
    animate('700ms 600ms cubic-bezier(0.86, 0, 0.07, 1)')
  ]),
  state('out', style({
    left: '-200px'
  })),
  transition('out => in', [
    animate('700ms 2500ms cubic-bezier(0.86, 0, 0.07, 1)')
  ]),

  // ENTER
  // transition(':enter', [
  //   style({
  //     height: '0'
  //   }),
  //   animate('500ms 600ms cubic-bezier(0.86, 0, 0.07, 1.2)', style({
  //     height: '100%'
  //   })),
  // ]),

]);
// LINE











// TEXT
export const textAnimation1 = trigger('textAnimation1', [
  state('inText', style({
    opacity: 1,
    top: '0'
  })),
  transition('inText => outText', [
    animate('700ms 700ms cubic-bezier(.94,.01,.06,1)')
  ]),
  state('outText', style({
    opacity: 0,
    top: '300px'
  })),
  transition('outText => inText', [
    group([
      animate('900ms 1900ms cubic-bezier(.94,.01,.06,1)', style({
        top: '0'
      })),
      animate('900ms 2000ms cubic-bezier(.94,.01,.06,1)', style({
        opacity: 1,
      }))
    ])
  ]),

  // ENTER
  transition(':enter', [
    style({
      opacity: 0,
      top: '300px'
    }),
    group([
      animate('1500ms 300ms cubic-bezier(.94,.01,.06,1)', style({
        top: '0'
      })),
      animate('400ms 200ms cubic-bezier(.94,.01,.06,1)', style({
        opacity: 1,
      }))
    ])
  ]),
  // LEAVE
  transition(':leave', [
    animate('200ms 300ms cubic-bezier(.52,0,.49,.99)', style({ opacity: 0 }))
  ])
]);



export const textAnimation2 = trigger('textAnimation2', [

  state('inText', style({
    opacity: 1,
    top: '0'
  })),
  transition('inText => outText', [
    animate('700ms 600ms cubic-bezier(.94,.01,.06,1)')
  ]),
  state('outText', style({
    opacity: 0,
    top: '300px'
  })),
  transition('outText => inText', [
    group([
      animate('900ms 2000ms cubic-bezier(.94,.01,.06,1)', style({
        top: '0'
      })),
      animate('900ms 2100ms cubic-bezier(.94,.01,.06,1)', style({
        opacity: 1,
      }))
    ])
  ]),

  // ENTER
  transition(':enter', [
    style({
      opacity: 0,
      top: '300px'
    }),
    group([
      animate('1500ms 400ms cubic-bezier(.94,.01,.06,1)', style({
        top: '0'
      })),
      animate('400ms 300ms cubic-bezier(.94,.01,.06,1)', style({
        opacity: 1,
      }))
    ])
  ]),
  // LEAVE
  transition(':leave', [
    animate('200ms 300ms cubic-bezier(.52,0,.49,.99)', style({ opacity: 0 }))
  ])
]);



export const textAnimation3 = trigger('textAnimation3', [
  state('inText', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('inText => outText', [
    animate('700ms 500ms cubic-bezier(.94,.01,.06,1)')
  ]),
  state('outText', style({
    opacity: 0,
    transform: 'translateY(300px)'
  })),
  transition('outText => inText', [
    group([
      animate('900ms 2100ms cubic-bezier(.94,.01,.06,1)', style({
        transform: 'translateY(0)'
      })),
      animate('900ms 2200ms cubic-bezier(.94,.01,.06,1)', style({
        opacity: 1,
      }))
    ])
  ]),

  // ENTER
  transition(':enter', [
    style({
      opacity: 0,
      top: '300px'
    }),
    group([
      animate('1500ms 500ms cubic-bezier(.94,.01,.06,1)', style({
        top: '0'
      })),
      animate('400ms 400ms cubic-bezier(.94,.01,.06,1)', style({
        opacity: 1,
      }))
    ])
  ]),
  // LEAVE
  transition(':leave', [
    animate('200ms 300ms cubic-bezier(.52,0,.49,.99)', style({ opacity: 0 }))
  ])
]);
// TEXT









export const loadingAnimation = trigger('loadingAnimation', [
  state('start', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('start => finish', [
    animate('500ms 500ms cubic-bezier(0.86, 0, 0.07, 1)')
  ]),
  state('finish', style({
    opacity: 0,
    transform: 'translateY(20px)',
    display: 'none'
  })),
  transition('finish => start', [
    animate('500ms 500ms cubic-bezier(0.86, 0, 0.07, 1)'),
  ])

]);
