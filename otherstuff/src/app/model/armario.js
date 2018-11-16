import * as THREE from 'three';

export class Armario extends THREE.Group {

    constructor(largura, altura, profundidade) {
        super();

        this.espessura = 1;
        // Floor
        var floorGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade);
        var floorMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood.png'),
            side: THREE.DoubleSide
        });
        var floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
        floorCube.position.y = -((altura - this.espessura) / 2);
        // Ceiling
        var ceilingGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade);
        var ceilingMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood.png'),
            side: THREE.DoubleSide
        });
        var ceilingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        //ceilingCube.castShadow=false;
        ceilingCube.position.y = ((altura - this.espessura) / 2);
        // Left Wall
        var leftWallGeometry = new THREE.BoxGeometry(this.espessura, altura, profundidade);
        var leftWallMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood.png'),
            side: THREE.DoubleSide
        });
        var leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
        leftWallCube.position.x = -((largura - this.espessura) / 2);
        // Right Wall
        var rightWallGeometry = new THREE.BoxGeometry(this.espessura, altura, profundidade);
        var rightWallMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood.png'),
            side: THREE.DoubleSide
        });
        var rightWallCube = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
        rightWallCube.position.x = ((largura - this.espessura) / 2);
        // Back Wall
        var backWallGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);
        var backWallMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('wood.png'),
            side: THREE.DoubleSide
        });
        var backWallCube = new THREE.Mesh(backWallGeometry, backWallMaterial);
        backWallCube.position.z = -((profundidade - this.espessura) / 2);

        // adding to the group
        this.add(floorCube);
        this.add(ceilingCube);
        this.add(leftWallCube);
        this.add(rightWallCube);
        this.add(backWallCube);
        this.children.forEach(element => {
            element.castShadow = true;
            //element.receiveShadow=true;
        })
    }

}