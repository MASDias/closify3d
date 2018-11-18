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
import * as dat from 'dat.gui'
import * as Controlkit from 'controlkit';
import { CreateArmarioGUI } from './gui/CreateArmarioGUI'
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

  static renderer: THREE.WebGLRenderer;
  static camera: THREE.Camera;
  static scene: THREE.Scene;
  static controls: OrbitControls;
  private raycaster: THREE.Raycaster;
  static mouse: THREE.Vector2;
  private INTERSECTED;
  private componentes: THREE.Group[];
  static datgui;
  private objetoSelecionado;
  private controlkit;

  //datgui
  static datguiStructure: {
    folderobjeto,
    objectcounter
  }
  static color: {
    color0
  }
  constructor(private elRef: ElementRef, private config: ConfigService) { }

  ngOnInit() {

    SceneComponent.renderer = new THREE.WebGLRenderer({ antialias: true });

    SceneComponent.scene = new THREE.Scene();

    SceneComponent.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster;
    this.componentes = new Array();
    SceneComponent.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    SceneComponent.controls = new OrbitControls(SceneComponent.camera, SceneComponent.renderer.domElement);
    this.initFloor();
    this.initRenderer();
    this.initControlKit();
    this.initdatGUI();
    this.initObjects();
    this.initLights();
    const render = () => {
      requestAnimationFrame(render);

      this.raycaster.setFromCamera(SceneComponent.mouse, SceneComponent.camera);
      var intersects = this.raycaster.intersectObjects(SceneComponent.scene.children, true);

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
      this.controlkit.update();
      SceneComponent.renderer.render(SceneComponent.scene, SceneComponent.camera);
    }

    render();

  }
  initControlKit(): any {
    /*var obj = {
      number: 0,
      string: 'abc',
      textures: ["example1", "example2", "example3"],
      selectedTarget: "example1"
    }
    this.controlkit = new Controlkit();
    this.controlkit.addPanel({
      align: 'left',
      position: [10, 10]
    })
      .addGroup()
      .addSubGroup()
      .addNumberInput(obj, 'number')
      .addStringInput(obj, 'string')
      .addSelect(obj, 'textures', { label: 'Select', selectTarget: 'selectedTarget' });
    */
    this.controlkit = new CreateArmarioGUI(this.createArmarioAddScene);
  }

  initdatGUI(): void {
    SceneComponent.datguiStructure = {
      folderobjeto: "",
      objectcounter: 0
    }
    SceneComponent.color = {
      color0: 0
    }
    SceneComponent.datgui = new dat.GUI();
    var cam = SceneComponent.datgui.addFolder('Camera');
    var x = cam.add(SceneComponent.camera.position, 'x', -100, 100).listen();
    cam.add(SceneComponent.camera.position, 'y', -100, 100).listen();
    cam.add(SceneComponent.camera.position, 'z', -100, 100).listen();


  }
  static initdatGuiObjeto(objeto) {
    var folder;
    folder = SceneComponent.datgui.addFolder('Objeto ' + SceneComponent.datguiStructure.objectcounter);
    SceneComponent.datguiStructure.objectcounter++;
    var x = folder.add(objeto.position, 'x', -100, 100).listen();
    x.onChange((value) => {
      objeto.position.x = value;
    });
    var y = folder.add(objeto.position, 'y', -100, 100).listen();
    y.onChange((value) => {
      objeto.position.y = value;
    });
    var z = folder.add(objeto.position, 'z', -100, 100).listen();
    z.onChange((value) => {
      objeto.position.z = value;
    });

    var color = Math.random() * 0xffffff;
    folder.addColor(this.color, 'color0', color).onChange(() => {
      objeto.children.forEach(element => {
        if (element.material != null)
          element.material.color.setHex(this.dec2hex(this.color.color0));
      });

    });
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
    SceneComponent.scene.add(floor);
  }
  initRenderer(): void {
    SceneComponent.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(SceneComponent.renderer.domElement);
    document.addEventListener('mousedown', this.onMouseDown, false);
    SceneComponent.renderer.gammaOutput = true;
    SceneComponent.renderer.shadowMap.enabled = true;
    SceneComponent.renderer.shadowMap.type = THREE.BasicShadowMap;
  }
  initObjects(): void {
    var armario = new Armario(12, 12, 12);
    SceneComponent.initdatGuiObjeto(armario);
    armario.position.y = 6;
    this.objetoSelecionado = armario;
    var alturaArmario = 20;
    var profundidadeArmario = 10;
    var armario3 = new Armario(20, alturaArmario, profundidadeArmario);
    SceneComponent.initdatGuiObjeto(armario3);
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
    SceneComponent.initdatGuiObjeto(armario2);
    armario2.position.y = altura / 2;
    armario2.position.x = -15;

    var gaveta = new Gaveta(10, 4, 10);
    SceneComponent.initdatGuiObjeto(gaveta);
    armario2.add(gaveta);
    gaveta.position.y = -4.5;

    var porta = new Porta(10, 10);
    SceneComponent.initdatGuiObjeto(porta);
    armario.add(porta);
    porta.position.z = 1;
    this.componentes.push(porta);

    var cabide = new Cabide(10);
    SceneComponent.initdatGuiObjeto(cabide);
    armario2.add(cabide);
    cabide.position.y = 5;

    var prateleira = new Prateleira(10, 10);
    SceneComponent.initdatGuiObjeto(prateleira);
    armario2.add(prateleira);
    prateleira.position.z = 1;

    this.componentes.push(gaveta);
    this.componentes.push(cabide);
    this.componentes.push(prateleira);

    SceneComponent.scene.add(armario2);
    SceneComponent.scene.add(armario);
    SceneComponent.scene.add(armario3);

    var ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    SceneComponent.scene.add(ambientLight);
    this.initCamera();

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.castShadow = true;
    directionalLight.position.set(-5, 20, 10);
    directionalLight.shadow.bias = -0.001;
    SceneComponent.scene.add(directionalLight);
  }

  initLights(): void {
    var ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    SceneComponent.scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    //directionalLight.castShadow = true;
    directionalLight.position.set(-5, 20, 10);
    directionalLight.shadow.bias = -0.001;
    SceneComponent.scene.add(directionalLight);
  }
  initCamera(): void {
    SceneComponent.camera.position.set(0, 20, 55);
    SceneComponent.camera.lookAt(0, 0, 0);
  }
  onMouseDown(event: MouseEvent): void {

    //event.preventDefault();

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    SceneComponent.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    SceneComponent.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  }
  static dec2hex(i) {
    var result = "0x000000";
    if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
    else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
    else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
    else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
    else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
    else if (i >= 1048575) { result = '0x' + i.toString(16); }
    if (result.length == 8) { return result; }

  }

  createArmarioAddScene(armario) {
    SceneComponent.scene.add(armario);
    SceneComponent.initdatGuiObjeto(armario);
  }
}
