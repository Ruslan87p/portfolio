import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import { CursorService } from 'src/app/cursor.service';
import {FollowCursorOnHoverService} from './../../shared/follow-cursor-on-hover.service';
import * as math from 'mathjs/dist/math';


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
  isMobile = false;
  texture;
  material;
  mesh;
  mousemove;
  resize;
  animate;
  title;
  percentageLoading;
  counter2;


  constructor(private sharedSvc: SharedService,
              private headerSvc: HeaderVisStateService) {
    this.isWidth = window.innerWidth;
  }



  @ViewChild('line', {static: false}) lineLoading;
  @ViewChild('sentence', {static: false}) sentence;
  reveal;
  complete;
  statesSubs;

  ngOnInit() {

    const line = document.querySelector('.left-line');
    this.state = 'out';
    this.stateLine = 'out';
    this.loadingState = 'start';
    this.textState = 'outText';



    this.statesSubs = () => {
      this.subs = this.sharedSvc.iconState.subscribe(() => {
        this.state = this.state === 'in' ? 'out' : 'in';
        this.textState = this.textState === 'inText' ? 'outText' : 'inText';
        this.stateLine = this.stateLine === 'in' ? 'out' : 'in';

        line.classList.toggle('play-back');
      });

    }


    let camera, scene, renderer;
    
    if(this.isWidth < 700) {
      this.isMobile = true;

      setTimeout( () => {
  
          this.statesSubs();
          this.isLoaded = true;
          this.loadingState = 'finish';
          
          this.state = 'in';
          this.stateLine = 'in';
          this.textState = 'inText';

      }, 10);
      this.headerSvc.loadingCounter.next(100);
    }
    else {

      const links = document.querySelectorAll('.icon-social');
      new CursorService(links);
    
      if (links.length !== 0) {
        for (let i = 0; i < links.length; i++) { 
          new FollowCursorOnHoverService(links[i]);
        }
      }
      // FOG
        scene = new THREE.Scene();
        const color = 0x181818;
        const density = 1;
        scene.fog = new THREE.FogExp2(color, density);

    
    
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

    
    
    
        // start: CAMERA
        const container = document.getElementById('container');
        container.appendChild(renderer.domElement);
        this.container = container;
    
        const fov = 70;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 1000;
        camera = new THREE.PerspectiveCamera(
          fov,
          aspect,
          near,
          far
        );
        camera.position.set(0.0, 1.0, 1.6);
        // end: CAMERA


        
        const planeGeometry = new THREE.PlaneBufferGeometry( 2, 2, 16, 16 );

        const planeMaterial = new THREE.MeshPhongMaterial( { color: 0x3c4eb0f0 } )
        

        const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.receiveShadow = true;
        plane.castShadow = false;
        plane.position.set(0.0, 1.0, -0.3);
        scene.add( plane );


        
        // Define the lights for the scene
        const lightPoin = new THREE.DirectionalLight( 0x3c4eb0, 2, 10 );
        lightPoin.position.set(0, 0, 25);
        lightPoin.castShadow = true;  
        lightPoin.receiveShadow = false; 
        scene.add(lightPoin);


        const objectLoader = new THREE.OBJLoader();
        
        objectLoader.load('./../../assets/img/obj/handobj.obj', ( object ) => {
          // called when the resource is loaded
            if (object) {
              
              object.traverse( (child) => {child.castShadow = true;} );
              object.castShadow = true;
              object.receiveShadow = false;
              scene.add( object );
            }
        },
          ( xhr ) => {
            this.counter = xhr.loaded / xhr.total * 100;
            this.percentageLoading = document.querySelector("#percentage");
            this.counter2 = math.round(this.counter) + '%';

            this.lineLoading.nativeElement.width = math.round(this.counter);
            this.headerSvc.loadingCounter.next(this.counter);
  
            if (this.counter >= 99) {
    
              this.statesSubs();
    
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
        const mouse = {x: 0,y: 0};
    
    
        this.animate = () => {
          requestAnimationFrame(this.animate);
          render();
        };
    
    
        function render() {
          scene.rotation.x += (scene.destination.x - scene.rotation.x) * 0.05;
          scene.rotation.y += (scene.destination.y - scene.rotation.y) * 0.05;
          renderer.render(scene, camera);
        }
    
    
       
        this.resize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
        window.addEventListener('resize', this.resize);
    


        this.mousemove = (ep) => { 
          const x = (ep.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
          const y = (ep.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

          scene.destination.x = y * 0.1;
          scene.destination.y = x * 0.1;

          event.preventDefault();
          mouse.x = (ep.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(ep.clientY / window.innerHeight) * 2 + 1;

          // Make the light follow the mouse
          var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
          vector.unproject(camera);
          var dir = vector.sub(camera.position).normalize();
          var distance = -camera.position.z / dir.z;
          var pos = camera.position.clone().add(dir.multiplyScalar(distance));
          lightPoin.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));

        }
    
        window.addEventListener('mousemove', this.mousemove);
        this.animate();
    }


  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
    window.removeEventListener('mousemove', this.mousemove);
    window.removeEventListener('resize', this.resize);
    cancelAnimationFrame(this.animate);
    clearTimeout();
  }

}
