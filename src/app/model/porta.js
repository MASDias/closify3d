import * as THREE from 'three';

export class Porta extends THREE.Group {

    constructor(largura, altura) {

        super();

        this.largura = largura;
        this.altura = altura;
        this.playingAnimation = false;
        this.reverseAnimation = false;

        this.espessura = 1;

        // Front
        var frontGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);
        //frontGeometry.translate(0, largura / 2, 0);
        var material = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
            side: THREE.DoubleSide
        });

        // frontGeometry.applyMatrix(
        //     new THREE.Matrix4().makeTranslation(largura / 2, 0, 0)
        // );

        var porta = new THREE.Mesh(frontGeometry, material);

        porta.castShadow = false;
        porta.position.z = - this.espessura / 2;


        // Pega
        var pegaGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 30);


        var pegaCylinder = new THREE.Mesh(pegaGeometry, material);
        pegaCylinder.rotateZ(3.1415 / 2);
        pegaCylinder.position.x = -(largura / 2) + this.espessura;
        pegaCylinder.position.z = this.espessura / 2;
        porta.add(pegaCylinder);

        porta.position.x = -largura / 2;

        // var pivotGeometry = new THREE.BoxGeometry(largura *2, altura, this.espessura);
        // var pivotMaterial = new THREE.MeshLambertMaterial({
        //     map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
        //     side: THREE.DoubleSide,
        //     transparent: true,
        //     opacity: 1
        // });
        // this.pivot = new THREE.Mesh(pivotGeometry, pivotMaterial);
        // this.pivot.position.x = largura/2;
        // this.pivot.position.z = largura/2;
        // // porta.add(this.pivot);
        // // this.add(porta);
        // this.pivot.add(porta);
        // this.add(this.pivot);

        // var axis = new THREE.Vector3(porta.position.x + largura / 2, porta.position.y, 0).normalize();
        // porta.rotateOnAxis(axis);

        this.position.x = largura / 2;
        this.add(porta);
    }

    update(dt) {
        var velocidade = 2.0;
        //this.pivot.rotation.y += (velocidade * dt);
        if (this.playingAnimation) {
            if (this.reverseAnimation) velocidade *= -1;
            this.rotation.y += (velocidade * dt);
            // if (this.position.z > this.profundidade) {
            //     this.reverseAnimation = true;
            // } else {
            //     if (this.position.z <= 0) {
            //         this.position.z = 0;
            //         this.reverseAnimation = false;
            //         this.playingAnimation = false;
            //     }
            // }
        }
    }

    animate() {
        if (!this.playingAnimation) {
            this.playingAnimation = true;
        }
    }
}