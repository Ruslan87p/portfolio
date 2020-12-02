import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routeChangeAnimation} from './shared/routing.animation';
import {Meta, Title} from '@angular/platform-browser';
import {CursorService} from './cursor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeChangeAnimation
  ]
})
export class AppComponent implements OnInit {

  isMobile = true;

  constructor(private titleSvc: Title,
              private metaTagSvc: Meta) {


    this.titleSvc.setTitle('Plotkin Ruslan - Portfolio');
    this.metaTagSvc.updateTag({name: 'description', content: 'Home page'});

    const styles = [
      'border: 1px solid #3E0E02',
      'color: white',
      'width: 100vw',
      'padding: 20px',
      'background: #2d2d2d',
      'font-size: 1.2rem',
      'line-height: 40px',
      'text-align: center',
      'font-weight: bold'
    ].join(';');

    console.clear();
    console.log('%c 🔨 by 🤲 with ❤️ + ☕️', styles);

  }
  


  ngOnInit() {



    if (window.innerWidth > 700) {
      this.isMobile = false;
      const links = document.querySelectorAll('a');
      new CursorService(links);
    }
  }


  getRouteAnimationState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
}



}
