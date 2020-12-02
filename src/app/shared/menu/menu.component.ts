import {Component, OnDestroy, OnInit} from '@angular/core';
import {menuAnimation1, menuAnimation2, menuAnimation3} from './menu.animation';
import {SharedService} from '../shared.service';
import {Subscription} from 'rxjs';
import {MenuStateService} from './menu-state.service';
import {NavigationEnd, Router} from '@angular/router';
import {TimelineLite, Expo} from 'gsap/TweenMax';
import {FollowCursorOnHoverService} from '../follow-cursor-on-hover.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    menuAnimation1,
    menuAnimation2,
    menuAnimation3
  ]
})
export class MenuComponent implements OnDestroy, OnInit {

  state = '';
  subs: Subscription;
  sub2: Subscription;
  imgs;
  links;
  logoState = '';

  isActiveHome = false;
  isActiveAbout = false;
  isActiveWorks = false;

  getRandomArbitrary;
  navItem;

  constructor(private sharedSvc: SharedService,
              private menuStateSvc: MenuStateService,
              private router: Router) {
            
            this.getRandomArbitrary = (min, max) => {
              return Math.random() * (max - min) + min;
            }
  }

  ngOnInit() {
    
    // reveal animation on hover link
      let tl = new TimelineLite();
      this.navItem = document.querySelectorAll('.menu-item');
      const overlay = document.querySelectorAll(".overlay");

      

          if (this.navItem.length !== 0 && window.innerWidth > 700) {
            for (let i = 0; i < this.navItem.length; i++) { 
              new FollowCursorOnHoverService(this.navItem[i]);
              // Closure for each function
              let index = i; 
              this.navItem[i].addEventListener("mouseenter", () => {          
                tl = new TimelineLite();
                tl.to(overlay[index], 1, {
                  width: "80%",
                  ease: Expo.easeInOut
                });
              });
              this.navItem[i].addEventListener("mouseleave", () => {
                tl = new TimelineLite();
                tl.to(overlay[index], 1, {
                  width: "0",
                  ease: Expo.easeInOut
                });
              });
            }
          }
        


    
    const workActive = document.querySelector('.is-work');
    this.sub2 = this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd ) {
          if(event.url === "/") {
            this.isActiveHome = true;
            this.isActiveAbout = false;
            this.isActiveWorks = false;
            workActive.classList.remove('active-work');
          } else if(event.url === "/about") {
            this.isActiveAbout = true;
            this.isActiveWorks = false;
            this.isActiveHome = false;
            workActive.classList.remove('active-work');
          } else if(event.url === "/works") {
            this.isActiveWorks = true;
            this.isActiveHome = false;
            this.isActiveAbout = false;
            workActive.classList.remove('active-work');
          } else if(event.url.includes("/works/" + Math.random() * (10 - 0) + 0).toString()) {
            workActive.classList.add('active-work')
            this.isActiveWorks = false;
            this.isActiveHome = false;
            this.isActiveAbout = false;
          }
        }
      }
    );


    this.links = document.querySelectorAll('a');

    this.subs = this.sharedSvc.iconState.subscribe(() => {
      this.state = this.state === 'out' ? 'in' : 'out';
    });
  }


  isClicked() {

    this.links.forEach( (item) => {
      item.classList.add('disabled');
      setTimeout(() => {
        item.classList.remove('disabled');
      }, 2500);
    });

    this.state = this.state === 'out' ? 'in' : 'out';
    this.menuStateSvc.menuBgState.next(this.state);

  }







  ngOnDestroy() {
    this.subs.unsubscribe();
    this.sub2.unsubscribe();
    window.removeEventListener;
    new FollowCursorOnHoverService().off();
  }

}
