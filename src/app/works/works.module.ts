import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {worksRoutes} from './works.routing';
import { WorkComponent } from './work/work.component';
import { ResizeObserverDirective } from './work/resize-observer.directive';

@NgModule({
  declarations: [WorkComponent, ResizeObserverDirective],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(worksRoutes)
  ]
})
export class WorksModule { }
