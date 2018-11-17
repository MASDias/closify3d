import { Component, ElementRef, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Armario } from './model/armario';
import { Cabide } from './model/cabide';
import * as OrbitControls from 'three-orbitcontrols';
import * as THREE from 'three';
import { Gaveta } from './model/gaveta';
import { Porta } from './model/porta';
import { Prateleira } from './model/prateleira';
interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface Rotateable {
  rotation: Rotation;
}

//declare const THREE: any;

@Component({
  selector: 'my-scene',
  template: '',
  styles: [`
    :xhost {
      display: grid;
    }

    xcanvas {
      height: 100%;
      width: 100%;
    }
  `],
})
export class SceneComponent implements OnInit {
  private host: HTMLElement = this.elRef.nativeElement;

  private renderer: THREE.WebGLRenderer;
  private camera: THREE.Camera;
  private scene: THREE.Scene;
  private controls: OrbitControls;
  constructor(private elRef: ElementRef, private config: ConfigService) { }

  ngOnInit() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    this.scene = new THREE.Scene();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.initFloor();
    this.initRenderer();
    this.initObjects();
    this.initLights();
    const render = () => {
      requestAnimationFrame(render);
      this.renderer.render(this.scene, this.camera);
    }
    render();

  }

  initFloor(): void {
    var texture = new THREE.TextureLoader().load('assets/texture/floor.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      //texture.offset(0, 0);
      texture.repeat.set(10, 10);
    });
    var floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200, 200, 200),
      new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.FrontSide
      })
    );
    floor.rotation.x -= Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }
  initRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
  }
  initObjects(): void {
    var armario = new Armario(12, 12, 12);
    armario.position.y = 6;

    var altura = 20;
    var armario2 = new Armario(12, altura, 12);
    armario2.position.y = altura / 2;
    armario2.position.x = -15;

    var gaveta = new Gaveta(10, 4, 10);
    armario2.add(gaveta);
    gaveta.position.y = -4.5;

    var porta = new Porta(10,10);
    armario.add(porta);
    porta.position.z = 1;

    var cabide = new Cabide(10);
    armario2.add(cabide);
    cabide.position.y = 5;

    var prateleira = new Prateleira(10,10);
    armario2.add(prateleira);
    prateleira.position.z = 1;
  
    this.scene.add(armario2);
    this.scene.add(armario);

    var ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    this.scene.add(ambientLight);
    this.camera.position.set(0, 20, 20);
    this.camera.lookAt(0, 0, 0);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.castShadow = true;
    directionalLight.position.set(-5, 20, 10);
    directionalLight.shadow.bias = -0.001;
    this.scene.add(directionalLight);
  }

  initLights(): void {
    var ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    this.scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.castShadow = true;
    directionalLight.position.set(-5, 20, 10);
    directionalLight.shadow.bias = -0.001;
    this.scene.add(directionalLight);
  }
  initCamera(): void {
    this.camera.position.set(0, 20, 20);
    this.camera.lookAt(0, 0, 0);
  }
}
