import * as THREE from 'three';

export class Porta extends THREE.Group {

    constructor(largura, altura) {

        super();

        this.largura = largura;
        this.altura = altura;
        this.playingAnimation = false;
        this.reverseAnimation = false;
        this.tetha = 0;
        this.espessura = 1;
        this.MAX_ROTATION = 110 * (Math.PI / 180);
        this.ROTATION_STEP = (Math.PI / 2.0) / 3;

        // Front
        var frontGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);
        //frontGeometry.translate(0, largura / 2, 0);
        var material = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
            side: THREE.DoubleSide
        });
        var porta = new THREE.Mesh(frontGeometry, material);

        porta.castShadow = false;
        porta.position.z = -this.espessura / 2;


        // Pega
        var pegaGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 30);


        var pegaCylinder = new THREE.Mesh(pegaGeometry, material);
        pegaCylinder.rotateZ(3.1415 / 2);
        pegaCylinder.position.x = -(largura / 2) + this.espessura;
        pegaCylinder.position.z = this.espessura / 2;
        porta.add(pegaCylinder);

        porta.position.x = -largura / 2;

        this.position.x = largura / 2;
        this.add(porta);
    }

    update(dt) {
        var velocidade = 1.0;
        if (this.playingAnimation) {
            if (this.reverseAnimation) velocidade *= -1;
            this.rotation.y += this.ROTATION_STEP * dt * velocidade;
            if (this.rotation.y >= this.MAX_ROTATION) {
                this.reverseAnimation = true;
                this.playingAnimation = false;
            }
            if (this.rotation.y <= 0) {
                this.playingAnimation = false;
                this.reverseAnimation = false;
                this.rotation.y = 0;
            }
        }
    }

    animate() {
        if (!this.playingAnimation) {
            this.playingAnimation = true;
        }
    }
}