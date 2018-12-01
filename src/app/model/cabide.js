import * as THREE from 'three';
import {
    TextureManager
} from './TextureManager';
export class Cabide extends THREE.Group {
    constructor(comprimento) {

        super();
        this.name = "Cabide";
        this.espessura = 1;
        this.textureName = "WOOD3_TEXTURE";
        // Pega1
        var pegaGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 30);
        var pegaMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(TextureManager.getInstance().getFilePath(this.textureName)),
            side: THREE.DoubleSide
        });
        var pegaCylinder = new THREE.Mesh(pegaGeometry, pegaMaterial);
        pegaCylinder.position.y = (comprimento / 2) - 0.5 / 2;

        // Pega2
        var pegaCylinder2 = new THREE.Mesh(pegaGeometry, pegaMaterial);
        pegaCylinder2.position.y = -(comprimento / 2) + 0.5 / 2;

        // Barra
        var barraGeometry = new THREE.CylinderGeometry((this.espessura / 4), (this.espessura / 4), comprimento, 30);
        var barra = new THREE.Mesh(barraGeometry, pegaMaterial);
        barra.position.z = 1;
        barra.position.y = 2.5;
        barra.rotateZ(3.1415 / 2);
        barra.add(pegaCylinder);
        barra.add(pegaCylinder2);

        barra.castShadow = false;

        // adding to the group
        this.add(barra);
        this.receiveShadow = true;
        this.castShadow = true;
        this.playAnimation = false;
        this.reverseAnimation = false;
        this.isWireFrame = false;
    }

    animate() {
        this.playAnimation = true;

    }

    update(dt) {
        var velocidade = 1;
        var step = Math.PI / 2;
        if (this.playAnimation) {
            var inc = velocidade * step * dt;
            this.rotation.y += inc;
            if (this.rotation.y > Math.PI * 2) {
                this.playAnimation = false;
                this.rotation.y -= Math.PI * 2;

            }
        }
    }
    loadTexture(textureName) {
        this.textureName = textureName;
        this.children.forEach(element => {
            if (element.isMesh) {
                element.material.map = TextureManager.getInstance().loadTexture(textureName);
                element.material.needsUpdate = true;
            }
        });
    }
    changeWireFrame() {
        this.isWireFrame = !this.isWireFrame;
        this.children.forEach(e => {
            e.material.wireframe = this.isWireFrame;
            e.material.needsUpdate = true;
        })
    }
}