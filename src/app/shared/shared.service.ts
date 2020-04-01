import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnDestroy {

  iconState: BehaviorSubject<any> = new BehaviorSubject('');

  // subs2: any;

  constructor(private router: Router, private route: ActivatedRoute) {


    // get data from routs of each component
    // this.subs2 = this.router.events
    //   .pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     map(() => this.route.snapshot),
    //     map(routing => {
    //       while (routing.firstChild) {
    //         routing = routing.firstChild;
    //       }
    //       return routing;
    //     })
    //   );
  }

  ngOnDestroy() {
    // this.subs2.forEach(s => s.unsubscribe());
  }
}
