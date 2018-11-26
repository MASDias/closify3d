import { Component, ElementRef, OnInit } from '@angular/core';
import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { ConfigService } from './config.service';
import { CreateArmarioGUI } from './gui/CreateArmarioGUI';
import { Armario } from './model/armario';
import { Cabide } from './model/cabide';
import { Divisao } from './model/divisao';
import { FocoDeLuz } from './model/focoDeLuz';
import { Gaveta } from './model/gaveta';
import { Porta } from './model/porta';
import { Prateleira } from './model/prateleira';
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { Scene } from 'three';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
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
  static camera: THREE.Camera;
  private scene: THREE.Scene;
  private controls: OrbitControls;
  //static raycaster: THREE.Raycaster;
  static mouse: THREE.Vector2;
  static sceneRaycaster: THREE.Scene;
  static INTERSECTED;
  static componentes;

  static instance;
  private datgui;
  private objetoSelecionado;
  private controlkit;

  private Armario;

  private stats;

  //datgui
  private datguiStructure: {
    folderobjeto,
    objectcounter
  }
  private color: {
    color0,
    color1
  }
  constructor(private elRef: ElementRef, private config: ConfigService) {
    SceneComponent.instance = this;
  }

  ngOnInit() {

    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.style.position = "fixed";
    this.stats.dom.style.top = null;
    this.stats.dom.style.bottom = 0;
    document.body.appendChild(this.stats.dom);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.scene = new THREE.Scene();
    SceneComponent.sceneRaycaster = this.scene;

    SceneComponent.mouse = new THREE.Vector2();
    //SceneComponent.raycaster = new THREE.Raycaster;
    SceneComponent.componentes = new Array();
    SceneComponent.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    this.controls = new OrbitControls(SceneComponent.camera, this.renderer.domElement);

    this.initFloor();
    this.initRenderer();
    this.initControlKit();
    this.initdatGUI();
    this.initObjects();
    this.initLights();
    const render = () => {
      this.stats.begin();
      this.controlkit.update();
      this.renderer.render(this.scene, SceneComponent.camera);
      this.stats.end();
      requestAnimationFrame(render);
    }


    var lastFrameTime = new Date().getTime() / 1000;
    var totalGameTime = 0;
    const update = (dt, t) => {
      //console.log(dt, t);

      SceneComponent.componentes.forEach(element => {
        if (element.update != null) {
          element.update(dt);
        }

      })
      setTimeout(function () {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;

        update(dt, totalGameTime);

        lastFrameTime = currTime;
      }, 0);
    }

    render();
    update(0, totalGameTime);
  }
  initControlKit(): any {
    this.controlkit = new CreateArmarioGUI(this, this.createArmarioAddScene);
  }

  initdatGUI(): void {
    this.datgui = new dat.GUI();
    this.datguiStructure = {
      folderobjeto: "",
      objectcounter: 0
    }
    this.color = {
      color0: 0,
      color1: 0,
    }
    var cam = this.datgui.addFolder('Camera');
    var x = cam.add(SceneComponent.camera.position, 'x', -100, 100).listen();
    cam.add(SceneComponent.camera.position, 'y', -100, 100).listen();
    cam.add(SceneComponent.camera.position, 'z', -100, 100).listen();


  }
  initdatGuiObjeto(objeto, isArmario = false) {
    var folder;
    folder = this.datgui.addFolder('Objeto ' + this.datguiStructure.objectcounter);
    this.datguiStructure.objectcounter++;
    var x = folder.add(objeto.position, 'x', -100, 100).step(0.5).listen();
    x.onChange((value) => {
      objeto.position.x = value;
    });
    var y = folder.add(objeto.position, 'y', -100, 100).listen().step(0.1);
    y.onChange((value) => {
      objeto.position.y = value;
    });
    var z = folder.add(objeto.position, 'z', -100, 100).listen().step(0.1);
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
    if (objeto.isLight != null && objeto.isLight == true)
      var color2 = Math.random() * 0xffffff;


    folder.addColor(this.color, 'color1', color2).onChange(() => {
      objeto.light.color.setHex(this.dec2hex(this.color.color1));
    });
    if (isArmario == false) {
      var structure = {
        remove:
          function remove() {
            var _datgui = SceneComponent.instance.datgui;
            var _objeto = objeto;
            var _folder = folder;
            var _armario = SceneComponent.instance.Armario;
            _armario.remove(_objeto);
            _datgui.removeFolder(_folder);

          }
      }
      folder.add(structure, "remove");
    }
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
    document.addEventListener('mousedown', this.onMouseDown, false);
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
  }
  initObjects(): void {
    var armario = new Armario(12, 12, 12);
    this.initdatGuiObjeto(armario);
    armario.position.y = 6;
    armario.position.z = -30;
    this.objetoSelecionado = armario;
    var alturaArmario = 20;
    var profundidadeArmario = 10;
    var armario3 = new Armario(20, alturaArmario, profundidadeArmario);

    this.initdatGuiObjeto(armario3);
    armario3.position.y = 10;
    armario3.position.x = 17;

    var divisao = new Divisao(alturaArmario, profundidadeArmario, true);
    divisao.position.x = -5;
    var divisao2 = new Divisao(alturaArmario, profundidadeArmario, false);
    divisao2.position.x = 5;
    armario3.add(divisao);
    armario3.add(divisao2);
    armario3.position.z = -30;


    var altura = 20;
    var armario2 = new Armario(12, altura, 12);
    armario2.name = "Armario";
    this.initdatGuiObjeto(armario2);
    armario2.position.y = altura / 2;
    armario2.position.x = -15;

    var gaveta = new Gaveta(10, 4, 10);
    gaveta.name = "Gaveta"
    this.initdatGuiObjeto(gaveta);
    armario2.add(gaveta);
    gaveta.position.y = -4.5;
    armario2.position.z = -30;

    var porta = new Porta(10, 10);
    porta.name = "Porta";
    this.initdatGuiObjeto(porta);
    armario.add(porta);
    porta.position.z = 1;
    SceneComponent.componentes.push(porta);

    var cabide = new Cabide(10);
    cabide.name = "Cabide";
    this.initdatGuiObjeto(cabide);
    armario2.add(cabide);
    cabide.position.y = 5;

    var prateleira = new Prateleira(10, 10);
    prateleira.name = "Prateleira";
    this.initdatGuiObjeto(prateleira);
    armario2.add(prateleira);
    prateleira.position.z = 1;

    SceneComponent.componentes.push(gaveta);
    SceneComponent.componentes.push(cabide);
    SceneComponent.componentes.push(prateleira);

    this.scene.add(armario2);
    this.scene.add(armario);
    this.scene.add(armario3);

    var focoDeLuz = new FocoDeLuz(armario2.position.x, armario2.position.y - 1, armario2.position.z);
    SceneComponent.componentes.push(focoDeLuz);
    this.scene.add(focoDeLuz);

    var ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    this.scene.add(ambientLight);
    this.initCamera();


  }

  initLights(): void {
    var ambientLight = new THREE.AmbientLight(0x404040, 0.10);
    this.scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    //directionalLight.castShadow = true;
    directionalLight.position.set(-5, 20, 10);
    directionalLight.shadow.bias = -0.001;
    this.scene.add(directionalLight);
  }
  initCamera(): void {
    SceneComponent.camera.position.set(0, 20, 55);
    SceneComponent.camera.lookAt(0, 0, 0);
  }
  onMouseDown(event: MouseEvent): void {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    SceneComponent.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    SceneComponent.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(SceneComponent.mouse, SceneComponent.camera)
    var intersects = raycaster.intersectObjects(SceneComponent.sceneRaycaster.children, true);

    if (intersects.length > 0) {
      for (var i = 0; i < intersects.length; i++) {
        if (intersects[0].object.parent === SceneComponent.componentes[i]) {
          if (SceneComponent.INTERSECTED != intersects[0].object) {
            if (SceneComponent.INTERSECTED) SceneComponent.INTERSECTED.material.emissive.setHex(SceneComponent.INTERSECTED.currentHex);
            SceneComponent.INTERSECTED = intersects[0].object;
            SceneComponent.INTERSECTED.currentHex = SceneComponent.INTERSECTED.material.emissive.getHex();
            SceneComponent.INTERSECTED.material.emissive.setHex(0xff0000);

            if (SceneComponent.INTERSECTED.parent.children.length > 0) {
              this.objetoSelecionado = SceneComponent.INTERSECTED.parent;
            } else {
              this.objetoSelecionado = SceneComponent.INTERSECTED;
            }
          } else {
            // Double click no objeto
            this.objetoSelecionado.animate();
          }
        }
      }
    } else {
      if (SceneComponent.INTERSECTED || this.objetoSelecionado) {
        SceneComponent.INTERSECTED.material.emissive.setHex(SceneComponent.INTERSECTED.currentHex);
        this.objetoSelecionado.material.emissive.setHex(this.objetoSelecionado.currentHex);
        SceneComponent.INTERSECTED = null;
        this.objetoSelecionado = null;
      }

    }
    console.log(this.objetoSelecionado);

  }
  dec2hex(i) {
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
    this.Armario = armario;
    this.scene.add(armario);
    this.initdatGuiObjeto(armario, true);
  }
  adicionarComponente(componente) {
    if (this.Armario == null) return;
    this.Armario.add(componente);
    this.initdatGuiObjeto(componente, false);
    SceneComponent.componentes.add(componente);
  }
}
