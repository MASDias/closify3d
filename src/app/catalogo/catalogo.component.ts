import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { Armario } from '../model/armario';
import { Cabide } from '../model/cabide';
import { Divisao } from '../model/divisao';
import { FocoDeLuz } from '../model/focoDeLuz';
import { Gaveta } from '../model/gaveta';
import { Porta } from '../model/porta';
import { Prateleira } from '../model/prateleira';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  private canvas;
  private scenes = [];
  private renderer;

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById("c");
    var objs = new THREE.Group[7];
    objs.push(new Armario(20, 10, 10));
    objs.push(new Cabide(10));
    objs.push(new Divisao(10, 10, false));
    objs.push(new FocoDeLuz(0, 0, 0));
    objs.push(new Gaveta(10, 5, 10));
    objs.push(new Porta(8, 10));
    objs.push(new Prateleira(10, 10));
    // var objetos:THREE.Group[] = [
    //   new Armario(20, 10, 10),
    //   new Cabide(10),
    //   new Divisao(10, 10, false),
    //   new FocoDeLuz(0, 0, 0),
    //   new Gaveta(10, 5, 10),
    //   new Porta(8, 10),
    //   new Prateleira(10, 10)
    // ];

    const render = () => {
      this.canvas.transform = `translateY(${window.scrollY}px)`;
      this.renderer.setClearColor(0xffffff);
      this.renderer.setScissorTest(false);
      this.renderer.clear();

      this.renderer.setClearColor(0xe0e0e0);
      this.renderer.setScissorTest(true);

      this.scenes.forEach(function (scene) {
        scene.children[0].rotation.y = Date.now() * 0.001;

        var element = scene.userData.element;

        var rect = element.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > this.renderer.domElement.clientHeight ||
          rect.right < 0 || rect.left > this.renderer.domElement.clientWidth) {
          return; // it's off screen
        }

        var width = rect.right - rect.left;
        var height = rect.bottom - rect.top;
        var left = rect.left;
        var top = rect.top;
        this.renderer.setViewport(left, top, width, height);
        this.renderer.setScissor(left, top, width, height);
        var camera = scene.userData.camera;

        this.renderer.render(scene, camera);
        requestAnimationFrame(render);
      });
    }

    var template = document.getElementById("template");
    var content = document.getElementById("content");

    for (var i = 0; i < objs.length; i++) {
      var scene = new THREE.Scene();

      var element = document.createElement("div");
      element.className = "list-item";
      //element.innerHTML = template.

      scene.userData.element = element.querySelector(".scene");
      content.appendChild(element);

      var camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
      camera.position.z = 2;
      scene.userData.camera = camera;
      var controls = new OrbitControls(scene.userData.camera, scene.userData.element);
      controls.minDistance = 2;
      controls.maxDistance = 5;
      controls.enablePan = false;
      controls.enableZoom = false;
      scene.userData.controls = controls;

      scene.add(objs[i]);

      scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));
      var light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(1, 1, 1);
      scene.add(light);
      this.scenes.push(scene);
    }

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }



}
