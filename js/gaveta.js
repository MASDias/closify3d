const THREE = require('three');

class Gaveta extends THREE.Group {
    constructor() {

        super();

        // Pega
        var pegaGeometry = new THREE.CylinderGeometry(0.5,0.5,0.5,30);
        var pegaMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var pegaCylinder = new THREE.Mesh(pegaGeometry, pegaMaterial);
        pegaCylinder.rotateX(3.1415/2);
        pegaCylinder.position.z = 0.5;

        // Floor
        var floorGeometry = new THREE.BoxGeometry(10, 1, 10);
        var floorMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
        floorCube.position.y = -4.5;
        // Front
        var frontGeometry = new THREE.BoxGeometry(10, 4, 1);
        var frontMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var frontCube = new THREE.Mesh(frontGeometry, frontMaterial);
        frontCube.castShadow = false;
        frontCube.position.z = 4.5;
        frontCube.position.y = -2.5;
        frontCube.add(pegaCylinder);
        // Left Wall
        var leftWallGeometry = new THREE.BoxGeometry(1, 4, 10);
        var leftWallMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
        leftWallCube.position.x = -4.5;
        leftWallCube.position.y = -2.5;
        // Right Wall
        var rightWallGeometry = new THREE.BoxGeometry(1, 4, 10);
        var rightWallMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var rightWallCube = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
        rightWallCube.position.x = 4.5;
        rightWallCube.position.y = -2.5;
        // Back Wall
        var backWallGeometry = new THREE.BoxGeometry(10, 4, 1);
        var backWallMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var backWallCube = new THREE.Mesh(backWallGeometry, backWallMaterial);
        backWallCube.position.z = -4.5;
        backWallCube.position.y = -2.5;

        // adding to the group
        this.add(floorCube);
        this.add(frontCube);
        this.add(leftWallCube);
        this.add(rightWallCube);
        this.add(backWallCube);
    }

}

module.exports = Gaveta;