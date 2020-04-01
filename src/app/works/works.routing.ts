import {Routes} from '@angular/router';
import {WorksComponent} from './works.component';
import {WorkComponent} from './work/work.component';

export const worksRoutes: Routes = [
  {
    path: '',
    component: WorksComponent,
    data: {
      title: 'TITLE',
      description: 'DESCRIPTION'
    }
  },
  {
    path: ':id',
    component: WorkComponent,
    data: {
      title: 'TITLE',
      description: 'DESCRIPTION'
    }
  }
] as Routes;
