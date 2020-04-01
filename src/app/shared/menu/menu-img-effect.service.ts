import * as THREE from 'three-full';
import {TweenMax, Expo} from 'gsap/TweenMax';


export class MenuImgEffectService {

  parent;
  dispImage;
  image1;
  image2;
  intensity;
  speedIn;
  speedOut;
  userHover;
  easing;

  scene;
  camera;
  renderer;
  loader;
  texture1;
  texture2;
  geometry;
  object;
  mat;
  disp;
  animate;

  constructor(opts) {

      this.parent = opts.parent || console.warn('no parent');
      this.dispImage = opts.displacementImage || console.warn('displacement image missing');
      this.image1 = opts.image1 || console.warn('first image missing');
      this.image2 = opts.image2 || console.warn('second image missing');
      this.intensity = opts.intensity || 1;
      this.speedIn = opts.speedIn || 1.6;
      this.speedOut = opts.speedOut || 1.2;
      this.userHover = (opts.hover === undefined) ? true : opts.hover;
      this.easing = opts.easing || Expo.easeOut;


      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(
        this.parent.offsetWidth / -2,
        this.parent.offsetWidth / 2,
        this.parent.offsetHeight / 2,
        this.parent.offsetHeight / -2,
        1,
        1000
      );

      this.camera.position.z = 1;

      this.renderer = new THREE.WebGLRenderer({
        antialias: false,
        // alpha: true
      });

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(0xffffff, 0.0);
      this.renderer.setSize(this.parent.offsetWidth, this.parent.offsetHeight);
      this.parent.appendChild(this.renderer.domElement);



      // let addToGPU = function(t) {
      //     renderer.setTexture2D(t, 0);
      // };

      this.loader = new THREE.TextureLoader();
      this.loader.crossOrigin = '';
      this.texture1 = this.loader.load(this.image1);
      this.texture2 = this.loader.load(this.image2);

      this.disp = this.loader.load(this.dispImage);
      this.disp.wrapS = this.disp.wrapT = THREE.RepeatWrapping;

      this.texture1.magFilter = this.texture2.magFilter = THREE.LinearFilter;
      this.texture1.minFilter = this.texture2.minFilter = THREE.LinearFilter;

      // this.texture1.anisotropy = this.renderer.getMaxAnisotropy();
      // this.texture2.anisotropy = this.renderer.getMaxAnisotropy();

      this.mat = new THREE.ShaderMaterial({
        uniforms: {
          effectFactor: {type: 'f', value: this.intensity},
          dispFactor: {type: 'f', value: 0.0},
          texture: {type: 't', value: this.texture1},
          texture2: {type: 't', value: this.texture2},
          disp: {type: 't', value: this.disp}
        },

        vertexShader: document.getElementById('vertShaderImg').textContent,
        fragmentShader: document.getElementById('fragShaderImg').textContent,
        transparent: true,
        opacity: 1.0
      });

      this.geometry = new THREE.PlaneBufferGeometry(
        this.parent.offsetWidth,
        this.parent.offsetHeight,
        1
      );
      this.object = new THREE.Mesh(this.geometry, this.mat);
      this.scene.add(this.object);



      if (this.userHover) {
        this.addEvents();
      }

      // window.addEventListener('resize', e => {
      //   this.renderer.setSize(this.parent.offsetWidth, this.parent.offsetHeight);
      // });




      this.reqAnimFrame();


  }

  addEvents = () => {
    let evtIn = 'mouseenter';
    let evtOut = 'mouseleave';
    if (this.mobileAndTabletcheck()) {
      evtIn = 'touchstart';
      evtOut = 'touchend';
    }
    this.parent.addEventListener(evtIn, e => {
      TweenMax.to(this.mat.uniforms.dispFactor, this.speedIn, {
        value: 1,
        ease: this.easing
      });
    });

    this.parent.addEventListener(evtOut, e => {
      TweenMax.to(this.mat.uniforms.dispFactor, this.speedOut, {
        value: 0,
        ease: this.easing
      });
    });
  }





  reqAnimFrame() {
    this.animate = () => {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    };
    this.animate();
  }


  mobileAndTabletcheck = () => {
    let check = false;
    (a => {
      // tslint:disable-next-line:max-line-length
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor);
    return check;
  }


}
