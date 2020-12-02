import {Component, AfterViewInit} from '@angular/core';
import {WorksDataService} from '../works-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {CursorService} from '../../cursor.service';
import {transitionAnimation} from '../../transition-animation';
import {TimelineLite} from 'gsap/TweenMax';
import {Smooth} from '../../about/scroll-skew';
import { LazyLoadingImg } from './inters.observable';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  animations: [transitionAnimation]
})
export class WorkComponent implements AfterViewInit {



  work;
  isLoaded = false;
  id: any;
  highlight;
  wrapperTransition;
  onSCrollShow;
  imgOverlay;
  tl;
  animatedElements;
  anchor;
  links;
  


  constructor(private worksDataSvc: WorksDataService,
              private router: Router,
              private route: ActivatedRoute,
              private titleSvc: Title,
              private metaTagSvc: Meta) {
  }


  ngAfterViewInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(this.id, 10);
    this.worksDataSvc.getProduct(this.id)
      .subscribe(
        (data: any) => {
          if (data) {

            // Dynamically set the metatags
            this.titleSvc.setTitle('Plotkin Ruslan Portfolio /' + data.title);
            this.metaTagSvc.updateTag({name: 'description', content: 'My works'});

            this.work = data;
            this.isLoaded = true;

            setTimeout( () => {
              this.imgOverlay = document.querySelectorAll('.overlay-img');
              this.highlight = document.getElementById('highlight');
              this.links = document.querySelectorAll('a');

              this.anchor = document.querySelectorAll('.anchor');
              new LazyLoadingImg(this.anchor)
            }, 50);


          } 
          else {
            this.router.navigate(['/works']);
          }

          if(window.innerWidth > 700) {
          
            setTimeout( () => {
              this.anchor = document.querySelectorAll('.anchor');
              new LazyLoadingImg(this.anchor)
              
              new Smooth(this.highlight);
              new CursorService(this.links);
            }, 50);
   
          }
          
        });
  }




  nextWork() {
    this.wrapperTransition = document.getElementById('wrapper-transition');

    const tl = new TimelineLite();
    /* Fading in and out */

    tl.fromTo(this.wrapperTransition, 0.4, {
        opacity: 1,
        ease: 'cubic-bezier(.94,.01,.06,1)',
        y: 0
    }, {
      opacity: 0,
      ease: 'cubic-bezier(.94,.01,.06,1)',
      y: -20
    });

    setTimeout(() => {
      this.id++;
      this.worksDataSvc.getProduct(this.id)
        .subscribe(
          (data: any) => {
            if (data) { 
              tl.fromTo(this.wrapperTransition, 0.4, {
                opacity: 0,
                ease: 'cubic-bezier(.94,.01,.06,1)',
                y: -20
              }, {
                opacity: 1,
                ease: 'cubic-bezier(.94,.01,.06,1)',
                y: 0
              }, '+=0.5');
              this.router.navigate(['/works/' + this.id]);
              this.work = data;
            } else {
              this.router.navigate(['/works/']);
            }
          });
    }, 600);


  }




}
