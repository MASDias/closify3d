import * as THREE from 'three';
export class Gaveta extends THREE.Group {
    constructor(largura, altura, profundidade) {

        super();

        this.espessura = 1;

        var material = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood4.jpg'),
            side: THREE.DoubleSide
        });

        // Pega
        var pegaGeometry = new THREE.CylinderGeometry(this.espessura / 2, this.espessura / 2, this.espessura / 2, 30);
        var pegaCylinder = new THREE.Mesh(pegaGeometry, material);
        pegaCylinder.rotateX(3.1415 / 2);
        pegaCylinder.position.z = this.espessura / 2;

        // Floor
        var floorGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade + this.espessura);
        var floorCube = new THREE.Mesh(floorGeometry, material);
        floorCube.position.y = -altura;
        floorCube.position.z = (this.espessura / 2);
        // Front
        var frontGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);
        var frontWall = new THREE.Mesh(frontGeometry, material);
        frontWall.castShadow = false;
        frontWall.position.z = (profundidade) / 2 + (this.espessura / 2);
        frontWall.position.y = -(altura + this.espessura) / 2;
        
        frontWall.add(pegaCylinder);
        // Left Wall
        var leftWallGeometry = new THREE.BoxGeometry(this.espessura, altura, profundidade + this.espessura);
        var leftWallCube = new THREE.Mesh(leftWallGeometry, material);
        leftWallCube.position.x = -((largura - this.espessura) / 2);
        leftWallCube.position.y = -((altura + this.espessura) / 2);
        leftWallCube.position.z = (this.espessura / 2);
        // Right Wall
        var rightWallGeometry = new THREE.BoxGeometry(this.espessura, altura, profundidade + this.espessura);
        var rightWallCube = new THREE.Mesh(rightWallGeometry, material);
        rightWallCube.position.x = ((largura - this.espessura) / 2);
        rightWallCube.position.y = -((altura + this.espessura) / 2);
        rightWallCube.position.z = (this.espessura / 2);
        // Back Wall
        var backWallGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);
        var backWallCube = new THREE.Mesh(backWallGeometry, material);
        backWallCube.position.z = -((profundidade) / 2) + (this.espessura / 2);
        backWallCube.position.y = -((altura + this.espessura) / 2);

        // adding to the group
        this.add(floorCube);
        this.add(frontWall);
        this.add(leftWallCube);
        this.add(rightWallCube);
        this.add(backWallCube);
    }

    animate() {
        
    }

}