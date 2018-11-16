import * as THREE from 'three';
export class Gaveta extends THREE.Group {
    constructor(largura, altura, profundidade) {

        super();

        this.espessura = 1;

        // Pega
        var pegaGeometry = new THREE.CylinderGeometry(this.espessura / 2, this.espessura / 2, this.espessura / 2, 30);
        var pegaMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood3.jpg'),
            side: THREE.DoubleSide
        });
        var pegaCylinder = new THREE.Mesh(pegaGeometry, pegaMaterial);
        pegaCylinder.rotateX(3.1415 / 2);
        pegaCylinder.position.z = this.espessura / 2;

        // Floor
        var floorGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade + this.espessura);
        var floorMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood4.jpg'),
            side: THREE.DoubleSide
        });
        var floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
        floorCube.position.y = -altura;
        // Front
        var frontGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);
        var frontMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood4.jpg'),
            side: THREE.DoubleSide
        });
        var frontWall = new THREE.Mesh(frontGeometry, frontMaterial);
        frontWall.castShadow = false;
        frontWall.position.z = (profundidade) / 2;
        frontWall.position.y = -(altura + this.espessura) / 2;
        frontWall.add(pegaCylinder);
        // Left Wall
        var leftWallGeometry = new THREE.BoxGeometry(this.espessura, altura, profundidade + this.espessura);
        var leftWallMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood4.jpg'),
            side: THREE.DoubleSide
        });
        var leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
        leftWallCube.position.x = -((largura - this.espessura) / 2);
        leftWallCube.position.y = -((altura + this.espessura) / 2);
        // Right Wall
        var rightWallGeometry = new THREE.BoxGeometry(this.espessura, altura, profundidade + this.espessura);
        var rightWallMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood4.jpg'),
            side: THREE.DoubleSide
        });
        var rightWallCube = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
        rightWallCube.position.x = ((largura - this.espessura) / 2);
        rightWallCube.position.y = -((altura + this.espessura) / 2);
        // Back Wall
        var backWallGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);
        var backWallMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood4.jpg'),
            side: THREE.DoubleSide
        });
        var backWallCube = new THREE.Mesh(backWallGeometry, backWallMaterial);
        backWallCube.position.z = -((profundidade) / 2 - this.espessura);
        backWallCube.position.y = -((altura + this.espessura) / 2);

        // adding to the group
        this.add(floorCube);
        this.add(frontWall);
        this.add(leftWallCube);
        this.add(rightWallCube);
        this.add(backWallCube);
    }

}