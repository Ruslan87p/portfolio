import * as THREE from 'three-full';

export class Gl {

  scene;
  camera;
  renderer;
  clock;
  geometry;
  material;
  mesh;
  divdiv;
  img;


  constructor(img, canvas) {

    this.img = img;
    this.scene = new THREE.Scene();


    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    this.camera.position.z = 1;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    this.divdiv = document.querySelector('.divdiv');
    this.renderer.setSize(this.divdiv.clientWidth, this.divdiv.clientHeight);
    // this.renderer.setClearColor(0xffffff, 1);

    this.clock = new THREE.Clock();

    this.onResize();
  }

  init() {
    this.createMesh();
    this.addEvents();
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(0.4, 0.6, 32, 32);
    this.material = new THREE.ShaderMaterial({
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(this.img) }
      },
      // wireframe: true,
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  addEvents() {
    window.requestAnimationFrame(this.run.bind(this));
    window.addEventListener('resize', this.onResize.bind(this), false);
  }

  run() {
    requestAnimationFrame(this.run.bind(this));
    this.render();
  }

  render() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const w = this.divdiv.clientWidth;
    const h = this.divdiv.clientHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h);
  }
}
