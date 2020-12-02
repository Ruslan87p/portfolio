import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '../home/home.component';
import {AboutComponent} from '../about/about.component';
import {WorksComponent} from '../works/works.component';
import {Page404Component} from '../page404/page404.component';
import {PortraitObjectComponent} from '../home/portrait-object/portrait-object.component';
import { GridComponent } from './grid/grid.component';
import {RouterModule} from '@angular/router';
import { CursorComponent } from './cursor/cursor.component';
import { MenuIconComponent } from './menu-icon/menu-icon.component';
import { MenuComponent } from './menu/menu.component';
import {AngularTiltModule} from 'angular-tilt';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    WorksComponent,
    Page404Component,
    PortraitObjectComponent,
    GridComponent,
    CursorComponent,
    MenuIconComponent,
    MenuComponent
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    WorksComponent,
    Page404Component,
    PortraitObjectComponent,
    GridComponent,
    CursorComponent,
    MenuIconComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularTiltModule
  ]
})
export class SharedModule { }
