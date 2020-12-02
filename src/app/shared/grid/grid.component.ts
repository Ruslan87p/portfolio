import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {
  gridChangeAnimation,
  gridChangeAnimationInner,
  gridChangeAnimationMobile1,
  gridChangeAnimationMobile2,
  gridChangeAnimationMobile3,
  gridChangeAnimationInnerMobile1,
  gridChangeAnimationInnerMobile2,
  gridChangeAnimationInnerMobile3,
} from './grid.animation';
import {Subscription} from 'rxjs';
import {MenuStateService} from '../menu/menu-state.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  animations: [
    gridChangeAnimation,
    gridChangeAnimationInner,
    gridChangeAnimationMobile1,
    gridChangeAnimationMobile2,
    gridChangeAnimationMobile3,
    gridChangeAnimationInnerMobile1,
    gridChangeAnimationInnerMobile2,
    gridChangeAnimationInnerMobile3
  ]
})
export class GridComponent implements OnDestroy, OnInit {

  state = 'in';
  subs: Subscription;
  subs2: Subscription;
  isMobile = false;
  width;

  constructor(private sharedSvc: SharedService,
              private menuStateSvc: MenuStateService) {

    this.width = window.innerWidth;
    if(this.width < 700) {
      this.isMobile = true;
    }

    this.subs = this.sharedSvc.iconState.subscribe(() => {
      this.state = this.state === 'in' ? 'out' : 'in';
    });



    // Get menu state from service was pushed there from menu component
    this.subs2 = this.menuStateSvc.menuBgState.subscribe(() => {
      this.state = this.state === 'in' ? 'out' : 'in';
    });


  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.subs2.unsubscribe();
  }

}
