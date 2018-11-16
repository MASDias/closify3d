const THREE = require('three')

class Armario extends THREE.Group {
    constructor() {

        super();

        // Floor
        var floorGeometry = new THREE.BoxGeometry(12, 1, 12);
        var floorMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
        floorCube.position.y = -5.5;
        // Ceiling
        var ceilingGeometry = new THREE.BoxGeometry(12, 1, 12);
        var ceilingMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var ceilingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        //ceilingCube.castShadow=false;
        ceilingCube.position.y = 5.5;
        // Left Wall
        var leftWallGeometry = new THREE.BoxGeometry(1, 12, 12);
        var leftWallMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
        leftWallCube.position.x = -5.5;
        // Right Wall
        var rightWallGeometry = new THREE.BoxGeometry(1, 12, 12);
        var rightWallMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var rightWallCube = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
        rightWallCube.position.x = 5.5;
        // Back Wall
        var backWallGeometry = new THREE.BoxGeometry(12, 12, 1);
        var backWallMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood.png'), side: THREE.DoubleSide });
        var backWallCube = new THREE.Mesh(backWallGeometry, backWallMaterial);
        backWallCube.position.z = -5.5;

        // adding to the group
        this.add(floorCube);
        this.add(ceilingCube);
        this.add(leftWallCube);
        this.add(rightWallCube);
        this.add(backWallCube);
        this.children.forEach(element=>{
            element.castShadow=true;
            //element.receiveShadow=true;
        })
    }

}

module.exports = Armario;