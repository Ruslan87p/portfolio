import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {menuAnimation1, menuAnimation2, menuAnimation3} from './menu.animation';
import {SharedService} from '../shared.service';
import {Subscription} from 'rxjs';
import {MenuImgEffectService} from './menu-img-effect.service';
import {MenuStateService} from './menu-state.service';


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
  imgs;
  links;
  logoState = '';




  constructor(private sharedSvc: SharedService,
              private menuStateSvc: MenuStateService) {
  }

  ngOnInit() {
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









  // TODO make on hover 3d rotation
  // calcWindowSize() {
  //   this.widthW = window.innerWidth;
  //   this.heightH = window.innerHeight;
  // }
  // addTransform(event) {
  //   const x = event.clientX;
  //   const y = event.clientY;
  //   const wrapperWidth = this.imgs[0].nativeElement.offsetWidth;
  //   const wrapperHeight = this.imgs[0].nativeElement.offsetHeight;
  //   const wrapperX = x - (this.widthW - wrapperWidth) / 4;
  //   const wrapperPx = 2 * (wrapperX / wrapperWidth * 100 - 50);
  //   const wrapperY = y - (this.heightH - wrapperHeight) / 4;
  //   const wrapperPy = 2 * (wrapperY / wrapperHeight * 100 - 50);
  //   this.imgs[0].nativeElement.style.transform = 'rotateY(' + wrapperPx / 20 + 'deg) rotateX(' + wrapperPy / -10 + 'deg)';
  // }
  // clearTransform() {
  //   this.imgs[0].nativeElement.style.transform = 'none';
  // }
  //
  // handleOrientation() {
  //
  //   this.widthW = window.innerWidth;
  //   this.heightH = window.innerHeight;
  //
  //   window.onresize = this.calcWindowSize;
  //   window.onload = this.calcWindowSize;
  //
  // }








  ngOnDestroy() {
    this.subs.unsubscribe();
    // this.subs2.unsubscribe();
  }

}
