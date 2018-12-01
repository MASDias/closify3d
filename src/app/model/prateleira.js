import * as THREE from 'three';
import {
    TextureManager
} from './TextureManager';
export class Prateleira extends THREE.Group {
    constructor(largura, profundidade) {

        super();
        this.name = "Prateleira"
        this.espessura = 1;
        this.profundidade = profundidade;
        this.textureName = "WOOD3_TEXTURE";

        // Prateleira
        var frontGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade);
        var frontMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(TextureManager.getInstance().getFilePath(this.textureName)),
            side: THREE.DoubleSide
        });
        var prateleira = new THREE.Mesh(frontGeometry, frontMaterial);
        prateleira.castShadow = true;
        prateleira.receiveShadow = true;

        // adding to the group
        this.add(prateleira);
        this.isWireFrame = false;

    }

    update(dt) {
        var velocidade = 12;
        if (this.playingAnimation) {
            if (this.reverseAnimation) {
                velocidade *= -1;
            }
            this.position.z = this.position.z + velocidade * dt;
            if (this.position.z > this.profundidade) {
                this.reverseAnimation = true;
                //Sound effects
                var listener = new THREE.AudioListener();
                var sound = new THREE.Audio(listener);
                var audioLoader = new THREE.AudioLoader();
                audioLoader.load('assets/sounds/Drawer_Closing.mp3', function (buffer) {
                    sound.setBuffer(buffer);
                    sound.setVolume(0.3);
                    sound.play();
                });
            } else {
                if (this.position.z <= 0) {
                    this.position.z = 0;
                    this.reverseAnimation = false;
                    this.playingAnimation = false;
                }
            }
        }

    }
    animate() {
        if (!this.playingAnimation) {
            this.playingAnimation = true;

            //Sound effects
            var listener = new THREE.AudioListener();
            var sound = new THREE.Audio(listener);
            var audioLoader = new THREE.AudioLoader();
            audioLoader.load('assets/sounds/Drawer_Opening.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setVolume(0.3);
                sound.play();
            });
        }

    }
    loadTexture(textureName) {
        this.textureName = textureName;
        this.children.forEach(element => {
            if (element.isMesh) {
                element.material.map = TextureManager.getInstance().loadTexture(textureName);
                element.material.needsUpdate = true;
            }
        });
    }
    changeWireFrame() {
        this.isWireFrame = !this.isWireFrame;
        this.children.forEach(e => {
            e.material.wireframe = this.isWireFrame;
            e.material.needsUpdate = true;
        })
    }

}