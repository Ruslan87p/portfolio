import {Component, OnDestroy, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import * as THREE from 'three-full';
import {
  lineAnimation,
  loadingAnimation,
  portraitAnimation,
  textAnimation1,
  textAnimation2,
  textAnimation3
} from './portrait.animation';
import {SharedService} from '../../shared/shared.service';
import {Subscription} from 'rxjs';
import { HeaderVisStateService } from './header-vis-state.service';

@Component({
  selector: 'app-portrait-object',
  templateUrl: './portrait-object.component.html',
  styleUrls: ['./portrait-object.component.css'],
  animations: [
    portraitAnimation,
    textAnimation1,
    textAnimation2,
    textAnimation3,
    lineAnimation,
    loadingAnimation,
  ]
})
export class PortraitObjectComponent implements OnInit, OnDestroy {

  container;
  state = '';
  textState = '';
  stateLine = '';
  loadingState = '';
  subs: Subscription;
  isLoaded = false;
  counter = 0;
  isWidth: number;
  objPath: string;

  constructor(private sharedSvc: SharedService,
              private headerSvc: HeaderVisStateService) {
    this.isWidth = window.innerWidth;
  }



  @ViewChild('percentage', {static: false}) percentageLoading;
  @ViewChild('line', {static: false}) lineLoading;
  @ViewChild('sentence', {static: false}) sentence;


  ngOnInit() {

    const line = document.querySelector('.left-line');
    this.state = 'out';
    this.stateLine = 'out';
    this.loadingState = 'start';
    this.textState = 'outText';

    let camera, scene, renderer;

      scene = new THREE.Scene();
      const color = 0x181818;
      const density = 0.8;
      scene.fog = new THREE.FogExp2(color, density);
  
  
      renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
  
  
  
  
      const sphere = new THREE.SphereBufferGeometry( 0.001, 16, 20 );
      // LIGHT
      const light1 = new THREE.PointLight( 0x45a3fa, 2, 25 );
      light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0984e3, wireframe: true } ) ) );
      scene.add( light1 );
  
      const light2 = new THREE.PointLight( 0x31d1d6, 2, 25 );
      light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0984e3, wireframe: true } ) ) );
      scene.add( light2 );
  
      const light3 = new THREE.PointLight( 0x45a3fa, 2, 25 );
      light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0984e3, wireframe: true } ) ) );
      scene.add( light3 );
  
      const light4 = new THREE.PointLight( 0x31d1d6, 2, 25 );
      light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0984e3, wireframe: true } ) ) );
      scene.add( light4 );
  
  
  
  
  
  
  
  
      // start: CAMERA
      const container = document.getElementById('container');
      container.appendChild(renderer.domElement);
      this.container = container;
  
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.001, 100
      );
      camera.position.set(0.0, 1.0, 1.4);
      scene.rotation.x += 0.5;
      // end: CAMERA
  
  
      const light = new THREE.DirectionalLight(0x111111, 0.5);
      light.position.setScalar(15);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0x222222, 0.5));
  
  
  
      const objectLoader = new THREE.OBJLoader();
      
      objectLoader.load('https://plotkinruslan.com/assets/img/obj/handobj.obj', ( object ) => {
        // called when the resource is loaded
          if (object) {
            scene.add( object );
          }
      },
        ( xhr ) => {

          this.counter = xhr.loaded / xhr.total * 100;
          this.percentageLoading.nativeElement.innerText = Math.round(this.counter) + '%';
          this.lineLoading.nativeElement.width = Math.round(this.counter) + '%';
  
          this.headerSvc.loadingCounter.next(this.counter);

          if (this.counter >= 99) {
  
            this.subs = this.sharedSvc.iconState.subscribe(() => {
              this.state = this.state === 'in' ? 'out' : 'in';
              this.textState = this.textState === 'inText' ? 'outText' : 'inText';
              this.stateLine = this.stateLine === 'in' ? 'out' : 'in';
  
              line.classList.toggle('play-back');
            });
  
              this.loadingState = 'finish';
              this.state = 'in';
              this.stateLine = 'in';
              this.textState = 'inText';
              this.isLoaded = true;
          }
  
        },
        ( error ) => {
          // called when loading has errors
          console.error( 'An error happened', error );
        });
  
  
  
  
  
  
      scene.destination = {x: 0, y: 0};
  
  
      const animate = () => {
        requestAnimationFrame(animate);
        render();
      };
  
  
      function render() {
        scene.rotation.x += (scene.destination.x - scene.rotation.x) * 0.05;
        scene.rotation.y += (scene.destination.y - scene.rotation.y) * 0.05;
  
        const time = Date.now() * 0.0005;
  
        light1.position.x = Math.sin( time * 0.7 ) * 10;
        light1.position.y = Math.cos( time * 0.5 ) * 20;
        light1.position.z = Math.cos( time * 0.3 ) * 10;
  
        light2.position.x = Math.cos( time * 0.3 ) * 10;
        light2.position.y = Math.sin( time * 0.5 ) * 20;
        light2.position.z = Math.sin( time * 0.7 ) * 10;
  
        light3.position.x = Math.sin( time * 0.7 ) * 10;
        light3.position.y = Math.cos( time * 0.3 ) * 20;
        light3.position.z = Math.sin( time * 0.5 ) * 10;
  
        light4.position.x = Math.sin( time * 0.3 ) * 10;
        light4.position.y = Math.cos( time * 0.7 ) * 20;
        light4.position.z = Math.sin( time * 0.5 ) * 10;
  
  
        renderer.render(scene, camera);
      }
  
  
      window.addEventListener('resize', resize);
      function resize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
  
      function mousemove(ep) {
        const x = (ep.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const y = (ep.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        scene.destination.x = y * 0.1;
        scene.destination.y = x * 0.1;
      }
  
      window.addEventListener('mousemove', mousemove);
      animate();





  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
