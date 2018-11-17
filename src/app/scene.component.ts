import { Component, ElementRef, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Armario } from './model/armario';
import { Cabide } from './model/cabide';
import * as OrbitControls from 'three-orbitcontrols';
import * as THREE from 'three';
import { Gaveta } from './model/gaveta';
import { Porta } from './model/porta';
import { Prateleira } from './model/prateleira';
import { Divisao } from './model/divisao';
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
  private raycaster: THREE.Raycaster;
  static mouse: THREE.Vector2;
  private INTERSECTED;
  private componentes: THREE.Group[];
  constructor(private elRef: ElementRef, private config: ConfigService) { }

  ngOnInit() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    
    this.scene = new THREE.Scene();
    
    SceneComponent.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster;
    this.componentes = new Array();

    this.initFloor();
    this.initRenderer();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.initObjects();
    this.initLights();
    const render = () => {
      requestAnimationFrame(render);

      this.raycaster.setFromCamera(SceneComponent.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        for (var i = 0; i < this.componentes.length; i++) {
          if (intersects[0].object.parent === this.componentes[i]) {
            if (this.INTERSECTED != intersects[0].object) {
              if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
              this.INTERSECTED = intersects[0].object;
              this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
              this.INTERSECTED.material.emissive.setHex(0xff0000);
            }
          }
        }
      } else {
        if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
        this.INTERSECTED = null;
      }

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
    this.renderer.setSize(window.innerWidth*0.6, window.innerHeight*0.6);
    document.body.appendChild(this.renderer.domElement);
    document.addEventListener('mousedown', this.onMouseDown, false);
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
  }
  initObjects(): void {
    var armario = new Armario(12, 12, 12);
    armario.position.y = 6;

    var alturaArmario = 20;
    var profundidadeArmario = 10;
    var armario3 = new Armario(20, alturaArmario, profundidadeArmario);
    armario3.position.y = 10;
    armario3.position.x = 17;

    var divisao = new Divisao(alturaArmario, profundidadeArmario, true);
    divisao.position.x = -5;
    var divisao2 = new Divisao(alturaArmario, profundidadeArmario, false);
    divisao2.position.x = 5;
    armario3.add(divisao);
    armario3.add(divisao2);


    var altura = 20;
    var armario2 = new Armario(12, altura, 12);
    armario2.position.y = altura / 2;
    armario2.position.x = -15;

    var gaveta = new Gaveta(10, 4, 10);
    armario2.add(gaveta);
    gaveta.position.y = -4.5;

    var porta = new Porta(10, 10);
    armario.add(porta);
    porta.position.z = 1;

    var cabide = new Cabide(10);
    armario2.add(cabide);
    cabide.position.y = 5;

    var prateleira = new Prateleira(10, 10);
    armario2.add(prateleira);
    prateleira.position.z = 1;

    this.componentes.push(gaveta);
    this.componentes.push(cabide);
    this.componentes.push(prateleira);

    this.scene.add(armario2);
    this.scene.add(armario);
    this.scene.add(armario3);

    var ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    this.scene.add(ambientLight);
   this.initCamera();

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
    //directionalLight.castShadow = true;
    directionalLight.position.set(-5, 20, 10);
    directionalLight.shadow.bias = -0.001;
    this.scene.add(directionalLight);
  }
  initCamera(): void {
    this.camera.position.set(0, 20, 55);
    this.camera.lookAt(0, 0, 0);
  }
  onMouseDown(event: MouseEvent): void {

    event.preventDefault();

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    SceneComponent.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    SceneComponent.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  }
}
