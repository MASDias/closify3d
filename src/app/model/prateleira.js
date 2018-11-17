import * as THREE from 'three';
export class Prateleira extends THREE.Group {
    constructor(largura, profundidade) {

        super();

        this.espessura = 1;

        // Prateleira
        var frontGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade);
        var frontMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
            side: THREE.DoubleSide
        });
        var prateleira = new THREE.Mesh(frontGeometry, frontMaterial);
        prateleira.castShadow = false;

        // adding to the group
        this.add(prateleira);

    }

}