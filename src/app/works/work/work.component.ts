import {Component, OnInit, ViewChild} from '@angular/core';
import {WorksDataService} from '../works-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {CursorService} from '../../cursor.service';
import {transitionAnimation} from '../../transition-animation';
import {TimelineLite} from 'gsap/TweenMax';
import {Smooth} from '../../about/scroll-skew';
import * as math from 'mathjs/dist/math';
import {Gl} from './hover';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  animations: [transitionAnimation]
})
export class WorkComponent implements OnInit {



  work;
  isLoaded = false;
  id: any;
  highlight;
  wrapperTransition;
  onScroll;
  currentState;
  pageHeight;
  scrollStatePercentage;
  scrollY;
  canvas;

  imageCollection = [];

  @ViewChild('percentage', {static: false}) percentageLoading;
  @ViewChild('line', {static: false}) lineLoading;
  @ViewChild('sentence', {static: false}) sentence;

  constructor(private worksDataSvc: WorksDataService,
              private router: Router,
              private route: ActivatedRoute,
              private titleSvc: Title,
              private metaTagSvc: Meta) {

  }


  ngOnInit() {


    // TODO show imgs by scroll on viewport
    // for (let i = 0; i < 100; i++) {
    //   const url = 'http://via.placeholder.com/500x450?text=Image No ' + (i + 1);
    //
    //   this.imageCollection[i] = {
    //     url,
    //     show: false
    //   };
    // }


    this.id = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(this.id, 10);

    this.worksDataSvc.getProduct(this.id)
      .subscribe(
        (data: any) => {
          // Dynamically set the metatags
          this.titleSvc.setTitle('Plotkin Ruslan Portfolio /' + data.title);
          this.metaTagSvc.updateTag({name: 'description', content: 'My works'});
          if (data) {

            this.work = data;
            this.isLoaded = true;
          } 
          else {
            this.router.navigate(['/works']);
          }
        });


    this.highlight = document.getElementById('highlight');





    setTimeout( () => {
      const links = document.querySelectorAll('a');
      new CursorService(links);
    }, 1000);


    new Smooth();


    this.onScroll = () => {
      // progress bar
      this.currentState = document.body.scrollTop || document.documentElement.scrollTop;
      this.pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.scrollStatePercentage = (this.currentState / this.pageHeight) * 100;
      this.highlight.style.width = this.scrollStatePercentage + '%';

      this.scrollY = math.round(this.scrollStatePercentage);

    };
    window.addEventListener('scroll', this.onScroll);

  }




//   //create a timeline that calls myFunction() when it completes
//   var tl = new TimelineLite({onComplete:myFunction});
//
// //now we'll use chaining, but break each step onto a different line for readability...
//   tl.fromTo(element, 1, {left:0}, {left:-100})    //tween element's left from 0 to -100
// .to(element, 1, {top:50}, "-=0.25")        //then tween element's top to 50, starting it 0.25 seconds before the previous tween ends
//   .set(element, {opacity:0})            //then set element.opacity to 0.5 immediately
//   .call(otherFunction)            //then call otherFunction()
//   .staggerTo([element1, element2, element3], 1.5, {rotation:45}, 0.25); //finally tween the rotation of element1, element2, and element3 to 45 and stagger the start times by 0.25 seconds
//



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

              // this.canvas = document.querySelector('#canvas');
              // console.log(this.canvas, 'this.canvas)');
              //
              // const scene = new Gl(this.work.image, this.canvas);
              // scene.init();
              // console.log(data);

            } else {
              this.router.navigate(['/works/']);
            }
          });
    }, 600);


  }




}
