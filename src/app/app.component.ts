import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {routeChangeAnimation} from './shared/routing.animation';
import {SharedService} from './shared/shared.service';
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



  constructor(private sharedSvc: SharedService,
              private titleSvc: Title,
              private metaTagSvc: Meta,
              private router: Router) {

    // auto scroll up, to header after loading page
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' } );
      }
    });


    this.titleSvc.setTitle('Plotkin Ruslan - Portfolio');
    this.metaTagSvc.updateTag({name: 'description', content: 'Home page'});

    const styles = [
      'border: 1px solid #3E0E02',
      'color: white',
      'padding: 20px',
      'background: -webkit-linear-gradient(#ee0979, #ff6a00)',
      'font-size: 1.5rem',
      'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
      'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
      'line-height: 40px',
      'text-align: center',
      'font-weight: bold'
    ].join(';');

    // console.clear();
    console.log(
      '%c Greeting you my young jedi',
      styles
    );

  }

  ngOnInit() {
    const links = document.querySelectorAll('a');
    new CursorService(links);
  }


  getRouteAnimationState(outlet: RouterOutlet) {
    // this.sharedSvc.iconState.subscribe((item) => {
    //   // console.log(item, 'app-component');
    //   // return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
    //   // this.state = this.state === 'in' ? 'in' : 'in';
    //   // return outlet && outlet.activatedRouteData && (outlet.activatedRouteData['state'] === this.state);
    // });
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
}



}
