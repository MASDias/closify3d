import * as THREE from 'three';
export class FocoDeLuz extends THREE.Group {
    constructor(x, y, z) {

        super();

        this.espessura = 0.5;

        var material = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
            emissive: 0xffffff,
            side: THREE.DoubleSide
        });

        // Base da Luz
        var baseGeometry = new THREE.CylinderGeometry(this.espessura / 2, this.espessura, this.espessura / 2, 30);
        var baseCylinder = new THREE.Mesh(baseGeometry, material);
        //baseCylinder.rotateX(3.1415 / 2);
        baseCylinder.position.z = this.espessura / 2;
        baseCylinder.position.x = x;
        baseCylinder.position.y = y;
        baseCylinder.position.z = z;

        // FocoDeLuz
        var FocoDeLuz = new THREE.SpotLight(0xffffff, 5, 50, 3.1415 / 4);
        FocoDeLuz.target.position.set(x,0,z);
        FocoDeLuz.castShadow = true;

        // adding to the group
        baseCylinder.add(FocoDeLuz);
        this.add(baseCylinder);
        this.add(FocoDeLuz.target);

    }

}