const THREE = require('three');

class Porta extends THREE.Group {
    constructor() {

        super();

        // Pega
        var pegaGeometry = new THREE.CylinderGeometry(0.5,0.5,0.5,30);
        var pegaMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood3.jpg'), side: THREE.DoubleSide });
        var pegaCylinder = new THREE.Mesh(pegaGeometry, pegaMaterial);
        //pegaCylinder.rotateX(3.1415/2);
        pegaCylinder.rotateZ(3.1415/2);
        pegaCylinder.position.x = -2;
        pegaCylinder.position.y = -1;
        pegaCylinder.position.z = 0.5;

        // Front
        var frontGeometry = new THREE.BoxGeometry(10, 10, 1);
        var frontMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('wood3.jpg'), side: THREE.DoubleSide });
        var frontCube = new THREE.Mesh(frontGeometry, frontMaterial);
        frontCube.castShadow = false;
        frontCube.position.z = 4.5;
        frontCube.position.y = -2.5;
        frontCube.add(pegaCylinder);

        // adding to the group
        this.add(frontCube);

    }

}

module.exports = Porta;