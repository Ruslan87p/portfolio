import * as math from 'mathjs/dist/math';

class Slider {

  /*** CONSTRUCTOR ***/
  options;
  isMouseDown;
  isTranslating;
  currentPosition;
  startPosition;
  endPosition;
  translation;
  animationFrame;
  boundaries;
  direction;

  onScroll;
  currentState;
  pageWidht;
  scrollStatePercentage;
  scrollY;

  constructor(option) {

    // our options
    this.options = {
      // slider state and values
      // the div we are going to translate
      element: option.element || document.getElementById('planes'),
      // the div we are going to fill by dragg
      scrollFill: document.getElementById('highlight'),
      // easing value, the lower the smoother
      easing: option.easing || 0.1,
      // translation speed
      // 1: will follow the mouse
      // 2: will go twice as fast as the mouse, etc
      dragSpeed: option.dragSpeed || 1,
      // duration of the in animation
      duration: option.duration || 750,
    };

    // if we are currently dragging
    this.isMouseDown = false;
    // if the slider is currently translating
    this.isTranslating = false;

    // current position
    this.currentPosition = 0;
    // drag start position
    this.startPosition = 0;
    // drag end position
    this.endPosition = 0;

    // slider translation
    this.translation = 0;

    this.animationFrame = null;

    // set up the slider
    this.setupSlider();
  }

  /*** HELPERS ***/

  // lerp function used for easing
  lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return (1 - amount) * value1 + amount * value2;
  }

  // return our mouse or touch position
  getMousePosition(e) {

    let mousePosition;
    if (e.targetTouches) {
      if (e.targetTouches[0]) {
        mousePosition = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
      } else if (e.changedTouches[0]) {
        // handling touch end event
        mousePosition = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
      } else {
        // fallback
        mousePosition = [e.clientX, e.clientY];
      }
    } else {
      mousePosition = [e.clientX, e.clientY];
    }

    return mousePosition;
  }

  // set the slider boundaries
  // we will translate it horizontally in landscape mode
  // vertically in portrait mode
  setBoundaries() {
    if (window.innerWidth >= window.innerHeight) {
      // landscape
      this.boundaries = {
        max: -1 * this.options.element.clientWidth + window.innerWidth,
        min: 0,
        sliderSize: this.options.element.clientWidth,
        referentSize: window.innerWidth,
      };

      // set our slider direction
      this.direction = 0;
    } else {
      // portrait
      this.boundaries = {
        max: -1 * this.options.element.clientHeight + window.innerHeight,
        min: 0,
        sliderSize: this.options.element.clientHeight,
        referentSize: window.innerHeight,
      };

      // set our slider direction
      this.direction = 1;
    }
  }

  /*** HOOKS ***/

  // this is called once our mousedown / touchstart event occurs and the drag started
  onDragStarted(mousePosition) {
  }

  // this is called while we are currently dragging the slider
  onDrag(mousePosition) {
  }

  // this is called once our mouseup / touchend event occurs and the drag started
  onDragEnded(mousePosition) {
  }

  // this is called continuously while the slider is translating
  // onTranslation() {
  // }

  // this is called once the translation has ended
  onTranslationEnded() {
  }

  // this is called before our slider has been resized
  onBeforeResize() {
  }

  // this is called after our slider has been resized
  onSliderResized() {
  }

  /*** ANIMATIONS ***/

  // this will translate our slider HTML element and set up our hooks
  translateSlider(translation) {
    translation = Math.floor(translation * 100) / 100;

    // should we translate it horizontally or vertically?
    const direction = this.direction === 0 ? 'translateX' : 'translateY';
    // apply translation
    this.options.element.style.transform = direction + '(' + translation + 'px)';

    // if the slider translation is different than the translation to apply
    // that means the slider is still translating
    if (this.translation !== translation) {
      // hook function to execute while we are translating
      // this.onTranslation();
    } else if (this.isTranslating && !this.isMouseDown) {
      // if those conditions are met, that means the slider is no longer translating
      this.isTranslating = false;

      // hook function to execute after translation has ended
      this.onTranslationEnded();
    }

    // finally set our translation
    this.translation = translation;
  }

  // this is our request animation frame loop where we will translate our slider
  animate() {
    // interpolate values
    const translation = this.lerp(this.translation, this.currentPosition, this.options.easing);

    // apply our translation
    this.translateSlider(translation);

    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  /*** EVENTS ***/

  // on mouse down or touch start
  onMouseDown(e) {
    // start dragging
    this.isMouseDown = true;

    // apply specific styles
    this.options.element.classList.add('dragged');

    // get our touch/mouse start position
    const mousePosition = this.getMousePosition(e);
    // use our slider direction to determine if we need X or Y value
    this.startPosition = mousePosition[this.direction];
    // drag start hook
    this.onDragStarted(mousePosition);
  }

  // on mouse or touch move
  onMouseMove(e) {
    // if we are not dragging, we don't do nothing
    if (!this.isMouseDown) return;

    // get our touch/mouse position
    const mousePosition = this.getMousePosition(e);

    // get our current position
    this.currentPosition = this.endPosition + ((mousePosition[this.direction] - this.startPosition) * this.options.dragSpeed);

    // if we're not hitting the boundaries
    if (this.currentPosition > this.boundaries.min && this.currentPosition < this.boundaries.max) {
      // if we moved that means we have started translating the slider
      this.isTranslating = true;
    } else {
      // clamp our current position with boundaries
      this.currentPosition = Math.min(this.currentPosition, this.boundaries.min);
      this.currentPosition = Math.max(this.currentPosition, this.boundaries.max);
    }

    // drag hook
    this.onDrag(mousePosition);
  }


  // on mouse up or touchend
  onMouseUp(e) {
    // we have finished dragging
    this.isMouseDown = false;

    // remove specific styles
    this.options.element.classList.remove('dragged');

    // update our end position
    this.endPosition = this.currentPosition;

    // send our mouse/touch position to our hook
    const mousePosition = this.getMousePosition(e);

    // drag ended hook
    this.onDragEnded(mousePosition);
  }

  // on resize we will need to apply old translation value to new sizes
  onResize(e) {
    this.onBeforeResize();

    // get our old translation ratio
    const ratio = this.translation / this.boundaries.sliderSize;

    // reset boundaries and properties bound to window size
    this.setBoundaries();

    // reset all translations
    this.options.element.style.transform = 'tanslate3d(0, 0, 0)';

    // calculate our new translation based on the old translation ratio
    let newTranslation = ratio * this.boundaries.sliderSize;
    // clamp translation to the new boundaries
    newTranslation = Math.min(newTranslation, this.boundaries.min);
    newTranslation = Math.max(newTranslation, this.boundaries.max);

    // apply our new translation
    this.translateSlider(newTranslation);

    // reset current and end positions
    this.currentPosition = newTranslation;
    this.endPosition = newTranslation;

    // call our resize hook
    this.onSliderResized();
  }

  /*** SET UP AND DESTROY ***/

  // set up our slider
  // init its boundaries, add event listeners and start raf loop
  setupSlider() {
    this.setBoundaries();

    // event listeners

    // mouse events
    this.options.element.addEventListener('mousemove', this.onMouseMove.bind(this), {
      passive: true,
    });
    this.options.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.options.element.addEventListener('mouseup', this.onMouseUp.bind(this));

    // touch events
    this.options.element.addEventListener('touchmove', this.onMouseMove.bind(this), {
      passive: true,
    });
    this.options.element.addEventListener('touchstart', this.onMouseDown.bind(this), {
      passive: true,
    });
    this.options.element.addEventListener('touchend', this.onMouseUp.bind(this));


    // resize event
    this.options.element.addEventListener('resize', this.onResize.bind(this));

    // launch our request animation frame loop
    this.animate();
  }

  // will be called silently to cleanly remove the slider
  destroySlider() {
    // remove event listeners

    // mouse events
    this.options.element.removeEventListener('mousemove', this.onMouseMove);
    this.options.element.removeEventListener('mousedown', this.onMouseDown);
    this.options.element.removeEventListener('mouseup', this.onMouseUp);

    // // touch events
    this.options.element.removeEventListener('touchmove', this.onMouseMove);
    this.options.element.removeEventListener('touchstart', this.onMouseDown);
    this.options.element.removeEventListener('touchend', this.onMouseUp);

    // resize event
    this.options.element.removeEventListener('resize', this.onResize);

    // cancel request animation frame
    cancelAnimationFrame(this.animationFrame);
  }

  // call this method publicly to destroy our slider
  destroy() {
    // destroy everything related to the slider
    this.destroySlider();
  }

}

export {
  RunSlider
};


class WebGLSlider extends Slider {

  /*** CONSTRUCTOR ***/
  animation;
  effect;
  planes;
  previousTranslation;
  shaderPass;
  offset;

  constructor(options) {
    super(options);

    // tweening
    this.animation = null;
    // value from 0 to 1 to pass as uniform to the WebGL
    // will be tweened on mousedown / touchstart and mouseup / touchend events
    this.effect = 0;

    // our WebGL variables
    this.planes = [];
    // we will keep track of the previous translation values on resize
    this.previousTranslation = {
      x: 0,
      y: 0,
    };
    this.shaderPass = null;
  }



  // this is called after our slider has been resized
  onSliderResized() {
    // we need to update our previous translation value
    this.previousTranslation = {
      x: this.direction === 0 ? this.translation : 0,
      y: this.direction === 1 ? this.translation : 0,
    };

    // reset our slides relative positions
    // because during the resize their positions has already been updated internally
    for (let i = 0; i < this.planes.length; i++) {
      this.planes[i].setRelativePosition(0, 0);
    }

    // update our direction uniform
    if (this.shaderPass) {
      // update direction
      this.shaderPass.uniforms.direction.value = this.direction;
    }
  }


  // call this method publicly to destroy our slider and the WebGL part
  // override the destroy method of the Slider class
  destroy() {
    // destroy everything related to WebGL and the slider
    this.destroySlider();
  }
}







class RunSlider {

  constructor() {
    // custom options
    const options2 = {
      easing: 0.1,
      duration: 500,
      dragSpeed: 1.75,
    };

    // let's go!
    new WebGLSlider(options2);
  }

}
