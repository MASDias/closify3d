import * as THREE from 'three';
export class Porta extends THREE.Group {
    constructor(largura, altura) {

        super();

        this.espessura = 1;

        // Pega
        var pegaGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 30);
        var pegaMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
            side: THREE.DoubleSide
        });
        var pegaCylinder = new THREE.Mesh(pegaGeometry, pegaMaterial);
        pegaCylinder.rotateZ(3.1415 / 2);
        pegaCylinder.position.x = -(largura / 2) + this.espessura;
        pegaCylinder.position.z = this.espessura / 2;

        // Front
        var frontGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);
        var frontMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
            side: THREE.DoubleSide
        });
        var porta = new THREE.Mesh(frontGeometry, frontMaterial);
        porta.castShadow = false;
        porta.position.z = 4.5;
        porta.add(pegaCylinder);

        // adding to the group
        this.add(porta);

    }

}