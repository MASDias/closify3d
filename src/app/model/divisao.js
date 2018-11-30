import * as THREE from 'three';
export class Divisao extends THREE.Group {
    constructor(altura, profundidade, invisivel) {

        super();
        this.name = "Divisao";
        this.espessura = 1;

        var divisionGeometry;
        var divisionMaterial;
        // Divisao
        if (invisivel) {
            divisionGeometry = new THREE.PlaneGeometry(profundidade - this.espessura, altura - (this.espessura * 2));
            divisionMaterial = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
        } else {
            divisionGeometry = new THREE.BoxGeometry(this.espessura, altura - (this.espessura * 2), profundidade - this.espessura);
            divisionMaterial = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
                side: THREE.DoubleSide
            });
        }

        var divisao = new THREE.Mesh(divisionGeometry, divisionMaterial);
        divisao.castShadow = false;
        if (invisivel) divisao.rotateY(3.1415 / 2);
        divisao.position.z = this.espessura / 2;


        // adding to the group
        this.add(divisao);

    }

    animate() {

    }

}