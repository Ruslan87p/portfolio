import * as math from 'mathjs/dist/math';


export class Smooth {

  data;
  dom;
  rAF;
  scrollY;
  currentState;
  pageHeight;
  scrollStatePercentage;
  onScroll;

  highlight;
  scrollProgress;

  parallax;
  
  initialTop = 0.3;
  parallaxRatio = -0.2;



  math = {
    lerp: (a, b, n) => {
      return (1 - n) * a + n * b;
    },
    norm: (value, min, max) => {
      return (value - min) / (max - min);
    }
  };

  config = {
    height: window.innerHeight,
    width: window.innerWidth
  };

  constructor(highlight?, parallax?) {

    this.highlight = highlight;
    this.parallax = parallax;

    this.bindMethods();

    this.data = {
      ease: 0.1,
      current: 0,
      last: 0
    };

    this.dom = {
      el: document.querySelector('[data-scroll]'),
      content: document.querySelector('[data-scroll-content]')
    };

    this.rAF = null;

    this.init();

    if(this.parallax) {
      this.initialTop = parallax.getBoundingClientRect().top; 
    }

  }

  bindMethods() {
    ['scroll', 'run', 'resize']
      .forEach((fn) => this[fn] = this[fn].bind(this));
  }


  setStyles() {
    Object.assign(this.dom.el.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    });
  }

  setHeight() {
    document.body.style.height = `${this.dom.content.offsetHeight}px`;
  }

  resize() {
    this.setHeight();
    this.scroll();
  }

  scroll() {
    this.data.current = window.scrollY;


    this.currentState = document.body.scrollTop || document.documentElement.scrollTop;
    this.pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollStatePercentage = (this.currentState / this.pageHeight) * 100;
    this.highlight.style.width = this.scrollStatePercentage + '%';

    if(this.scrollProgress) {
      this.scrollProgress.innerHTML = math.round(this.scrollStatePercentage);
    }

    // geting top of elements in loop that comes from about component

    if (window.innerWidth > 700) {

      this.scrollY = this.data.current;

      if(this.parallax) {
        this.parallax.style.top = (0 - (this.scrollY * this.parallaxRatio)) + 'px';
        this.parallax.style.transition = '100ms ease';
      }
    }
    
  }

  run() {
    this.data.last = this.math.lerp(this.data.last, this.data.current, this.data.ease);
    if (this.data.last < .1) {
      this.data.last = 0;
    }


    const diff = this.data.current - this.data.last;
    const acc = diff / this.config.width;
    const velo = +acc;
    const skew = velo * 7.5;

    this.dom.content.style.transform = `translate3d(0, -${this.data.last}px, 0) skewY(${skew}deg)`;

    this.requestAnimationFrame();
  }

  on() {
    this.setStyles();
    this.setHeight();
    this.addEvents();

    this.requestAnimationFrame();
  }

  off() {
    this.cancelAnimationFrame();
    this.removeEvents();
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run);
  }

  cancelAnimationFrame() {
    cancelAnimationFrame(this.rAF);
  }

  addEvents() {
    window.addEventListener('resize', this.resize, {passive: true});
    window.addEventListener('scroll', this.scroll, {passive: true});
  }

  removeEvents() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('scroll', this.scroll);
  }

  init() {
    this.on();
  }
}


