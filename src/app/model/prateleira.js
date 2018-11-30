import * as THREE from 'three';
export class Prateleira extends THREE.Group {
    constructor(largura, profundidade) {

        super();
        this.name = "Prateleira"
        this.espessura = 1;
        this.profundidade = profundidade;

        // Prateleira
        var frontGeometry = new THREE.BoxGeometry(largura, this.espessura, profundidade);
        var frontMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('assets/texture/wood3.jpg'),
            side: THREE.DoubleSide
        });
        var prateleira = new THREE.Mesh(frontGeometry, frontMaterial);
        prateleira.castShadow = true;
        prateleira.receiveShadow = true;

        // adding to the group
        this.add(prateleira);

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

}