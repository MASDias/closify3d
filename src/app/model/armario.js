import * as THREE from 'three';
import {
    Porta
} from './porta';

export class Armario extends THREE.Group {

    constructor(largura, altura, profundidade) {
        super();
        this.largura = largura;
        this.altura = altura;
        this.profundidade = profundidade;
        this.isArmario = true;

        this.espessura = 1;
        // Floor
        var floorGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade);

        var material = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood.png'),
            side: THREE.DoubleSide
        });
        var floorCube = new THREE.Mesh(floorGeometry, material);
        floorCube.position.y = -((altura - this.espessura) / 2);
        // Ceiling
        var ceilingGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade);

        var ceilingCube = new THREE.Mesh(ceilingGeometry, material);
        //ceilingCube.castShadow=false;

        ceilingCube.position.y = ((altura - this.espessura) / 2);
        // Left Wall
        var leftWallGeometry = new THREE.BoxGeometry(this.espessura, altura, profundidade);

        var leftWallCube = new THREE.Mesh(leftWallGeometry, material);
        leftWallCube.position.x = -((largura - this.espessura) / 2);
        // Right Wall
        var rightWallGeometry = new THREE.BoxGeometry(this.espessura, altura, profundidade);

        var rightWallCube = new THREE.Mesh(rightWallGeometry, material);
        rightWallCube.position.x = ((largura - this.espessura) / 2);
        // Back Wall
        var backWallGeometry = new THREE.BoxGeometry(largura, altura, this.espessura);

        var backWallCube = new THREE.Mesh(backWallGeometry, material);
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
        this.translateY(altura / 2);
        this.castShadow = true;
        this.receiveShadow = true;

    }

    animate() {

    }
    remove(object) {
        console.log(object);
        console.log(this.children);
        var index = this.children.indexOf(object);
        this.children.splice(index);
    }

    adicionarComponente(componente) {
        var added = true;
        if (componente instanceof Porta) {
            if (componente.altura > this.altura - 2* this.espessura) return false;
            componente.position.z = this.profundidade / 2;
        }
        this.add(componente);
        return added;
    }
}