import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {worksRoutes} from './works.routing';
import { WorkComponent } from './work/work.component';
import { HoverDirective } from './hover.directive';
// import {DeferLoadModule} from '@trademe/ng-defer-load';

@NgModule({
  declarations: [WorkComponent, HoverDirective],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(worksRoutes),
    // TODO show imgs by scroll on viewport
    // DeferLoadModule
  ]
})
export class WorksModule { }
