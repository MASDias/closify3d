import {Component, ElementRef, OnInit} from '@angular/core';
import {ConfigService} from './config.service';


interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface Rotateable {
  rotation: Rotation;
}

declare const THREE: any;

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

  constructor(private elRef: ElementRef, private config: ConfigService) {}

  ngOnInit() {
    const rect = this.host.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const geometry1 = new THREE.BoxGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({
      color: 'orange',
    });
    const cube = new THREE.Mesh(geometry1, material1);

    const edges = new THREE.BoxHelper(cube, 'darkorchid');

    const group = new THREE.Group();
    group.add(cube);
    group.add(edges);

    const scene = new THREE.Scene();
    scene.add(group);

    const camera = new THREE.PerspectiveCamera(undefined, w / h);
    camera.position.set(2, 2, 5);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    this.host.appendChild(renderer.domElement);

    const stereoEffect = new THREE.StereoEffect(renderer);
    stereoEffect.setSize(w, h);
    
    let prevAutoRotateMode;
    const render = () => {
      requestAnimationFrame(render);

      if (this.config.autoRotate) {
        if (this.config.autoRotateMode !== prevAutoRotateMode) {
          prevAutoRotateMode = this.config.autoRotateMode;
          this.rotateTo(group, {x: 0, y: 0, z: 0});
        }
        
        switch(this.config.autoRotateMode) {
          case 'random':
            this.rotateBy(group, 0.005);
            break;
          case 'diagonal':
            const axis = new THREE.Vector3(1, 1, 1).normalize();
            group.rotateOnAxis(axis, 0.01);
            break;
          default:
            break;
        }
      } else {
        this.rotateTo(group, this.config.rotation);
      }

      const activeRenderer = this.config.isStereo ? stereoEffect : renderer;
      activeRenderer.setSize(w, h);
      activeRenderer.render(scene, camera);
    };

    render();
  }

  private rotateBy(target: Rotateable, rad: number) {
    return this.rotateTo(target, {
      x: target.rotation.x + rad,
      y: target.rotation.y + rad,
      z: target.rotation.z + rad,
    });
  }

  private rotateTo(target: Rotateable, to: Rotation) {
    target.rotation.x = to.x;
    target.rotation.y = to.y;
    target.rotation.z = to.z;
  }
}
