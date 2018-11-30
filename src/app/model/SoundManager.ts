import * as THREE from 'three';
export class SoundManager {

    static sounds = {
        INVALID: {
            path: 'assets/sounds/invalid.wav',
            buffer: null
        }
    }
    private sound: THREE.Audio;
    private audioLoader: THREE.AudioLoader;
    constructor() {
        var listener = new THREE.AudioListener();
        this.sound = new THREE.Audio(listener);
        this.audioLoader = new THREE.AudioLoader();
    }

    playSound(type) {
        switch (type) {
            case "INVALID":
                {
                    if (SoundManager.sounds["INVALID"].buffer == null) {
                        this.loadAndPlay("INVALID");
                    } else {
                        this.sound.setBuffer(SoundManager.sounds["INVALID"].buffer);
                        this.sound.play();
                    }
                }
        }
    }

    loadAndPlay(type) {
        this.audioLoader.load(SoundManager.sounds[type].path, (buffer) => {
            SoundManager.sounds[type].buffer = buffer;
            this.sound.setBuffer(buffer);
            this.sound.setVolume(0.5);
            this.sound.play();
        }, () => { }, () => { })
    }
}