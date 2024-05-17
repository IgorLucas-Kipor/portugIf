import { trigger, state, style, animate, transition } from '@angular/animations';

export const dropdownAnimations = [
  trigger('openClose', [
    state('open', style({
      opacity: 1,
      height: '*',
    })),
    state('closed', style({
      opacity: 0,
      height: 0,
    })),
    transition('open => closed', [
      animate('0.3s ease-out')
    ]),
    transition('closed => open', [
      animate('0.3s ease-in')
    ]),
  ]),
];
