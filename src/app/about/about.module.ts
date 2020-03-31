import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {aboutRoutes} from './about.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(aboutRoutes),
  ]
})
export class AboutModule { }
