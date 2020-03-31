import {Routes} from '@angular/router';
import {Page404Component} from './page404.component';

export const page404Routes: Routes = [
  {
    path: '',
    component: Page404Component,
    data: {
      title: 'TITLE',
      description: 'DESCRIPTION'
    }
  }
] as Routes;
