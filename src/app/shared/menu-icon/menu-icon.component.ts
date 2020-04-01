import {Component, OnDestroy, OnInit} from '@angular/core';
import {FollowCursorOnHoverService} from '../follow-cursor-on-hover.service';
import {SharedService} from '../shared.service';
import {MenuStateService} from '../menu/menu-state.service';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.css']
})
export class MenuIconComponent implements OnInit, OnDestroy {

  iconOpen = 'out';
  subs: Subscription;
  isDisabled = false;


  constructor(private sharedSvc: SharedService,
              private menuStateSvc: MenuStateService) {}

  ngOnInit() {

    // icon menu animation
    const menuBtn = document.querySelector('#menu-button');


    // Get menu state from service was pushing there from menu component
    this.subs = this.menuStateSvc.menuBgState.subscribe(() => {
      menuBtn.classList.remove('open');
    });



    const menuIcon = document.querySelector('.header-menu-icon');
    const logo = document.querySelector('.header-logo');



    // service that move elements on hover of mouse in specified radius
    new FollowCursorOnHoverService(menuIcon);
    new FollowCursorOnHoverService(logo);

    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
    });


  }




  clickDelay() {

    this.iconOpen = this.iconOpen === 'out' ? 'in' : 'out';
    this.sharedSvc.iconState.next(this.iconOpen);

    this.isDisabled = true;
    setTimeout( () => {
      this.isDisabled = false;
    }, 2500);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
