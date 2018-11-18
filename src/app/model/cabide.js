import * as THREE from 'three';

export class Cabide extends THREE.Group {
    constructor(comprimento) {

        super();

        this.espessura = 1;

        // Pega1
        var pegaGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 30);
        var pegaMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
            side: THREE.DoubleSide
        });
        var pegaCylinder = new THREE.Mesh(pegaGeometry, pegaMaterial);
        pegaCylinder.position.y = comprimento / 2;

        // Pega2
        var pegaCylinder2 = new THREE.Mesh(pegaGeometry, pegaMaterial);
        pegaCylinder2.position.y = -(comprimento / 2);

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
    }

    animate() {

    }

}