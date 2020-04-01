import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {FollowCursorOnHoverService} from '../follow-cursor-on-hover.service';
import {SharedService} from '../shared.service';
import {MenuStateService} from '../menu/menu-state.service';
import {Subscription} from 'rxjs';
import {logoTransition, headerTransition} from '../menu-icon/menu-logo-transition';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderVisStateService } from 'src/app/home/portrait-object/header-vis-state.service';


@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.css'],
  animations: [
    logoTransition,
    headerTransition
  ]
})


export class MenuIconComponent implements OnInit, OnDestroy {

  iconOpen = 'out';
  subs: Subscription;
  isDisabled = false;
  logoHide = 'out';
  showHeader = 'out';
  sub1: Subscription;
  sub2: Subscription;
  

  constructor(private sharedSvc: SharedService,
              private menuStateSvc: MenuStateService,
              private router: Router,
              private headerSvc: HeaderVisStateService) {
              }


  ngOnInit() {

    // get loading counter and show header if it more than 99
    this.sub1 = this.headerSvc.data
      .subscribe( (counter) => {
          if (counter > 99) {
            this.showHeader = 'in';
          }
      })

    // get state of logo and by changing url path show the logo
    this.sub2 = this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.logoHide = 'out';
            if(event.url !== '/home') {
              this.showHeader = 'in';
            }
        }
      }
    );

    // icon menu animation
    const menuBtn = document.querySelector('#menu-button');


    // Get menu state from service was pushing there from menu component
    this.subs = this.menuStateSvc.menuBgState.subscribe(() => {
      menuBtn.classList.remove('open');
    });



    const menuIcon = document.querySelector('.header-menu-icon');
    const logo = document.querySelector('.header-logo');

    // service that move elements on hover mouse in specified radius
    new FollowCursorOnHoverService(menuIcon);
    new FollowCursorOnHoverService(logo);

    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
    });


  }




  clickDelay() {

    this.iconOpen = this.iconOpen === 'out' ? 'in' : 'out';
    this.logoHide = this.logoHide === 'out' ? 'in' : 'out';

    this.sharedSvc.iconState.next(this.iconOpen);

    this.isDisabled = true;
    setTimeout( () => {
      this.isDisabled = false;
    }, 2500);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
