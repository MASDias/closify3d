import * as THREE from 'three';
import {
    TextureManager
} from './TextureManager';
export class FocoDeLuz extends THREE.Group {
    constructor(x, y, z) {

        super();
        this.isLight = true;
        this.espessura = 0.5;
        this.name = "Foco de Luz";
        this.textureName = "WOOD3_TEXTURE";
        var material = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load(TextureManager.getInstance().getFilePath(this.textureName)),
            emissive: 0xffffff,
            side: THREE.DoubleSide
        });
        material.emissiveIntensity = 0.4;

        // Base da Luz
        var baseGeometry = new THREE.CylinderGeometry(this.espessura / 2, this.espessura, this.espessura / 2, 30);
        var baseCylinder = new THREE.Mesh(baseGeometry, material);
        //baseCylinder.rotateX(3.1415 / 2);
        baseCylinder.position.z = this.espessura / 2;
        baseCylinder.position.x = x;
        baseCylinder.position.y = y;
        baseCylinder.position.z = z;

        baseCylinder.castShadow = false;
        //baseCylinder.receiveShadow=true;

        // FocoDeLuz
        var FocoDeLuz = new THREE.SpotLight(0xFFFFAA, 1, 50, 3.1415 / 4);
        FocoDeLuz.target.position.set(x, 0, z);
        FocoDeLuz.castShadow = true;
        this.light = FocoDeLuz;
        // adding to the group
        baseCylinder.add(FocoDeLuz);
        this.add(baseCylinder);
        this.add(FocoDeLuz.target);

        FocoDeLuz.shadow.bias = -0.001;
        this.isWireFrame = false;

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