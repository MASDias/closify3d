import * as THREE from 'three';
export class SoundManager {

    private static instance: SoundManager;

    static sounds = {
        INVALID: {
            path: 'assets/sounds/invalid.wav',
            buffer: null
        },
        CORRECT: {
            path: 'assets/sounds/correct.mp3',
            buffer: null
        },
        HAMMER: {
            path: 'assets/sounds/hammer.wav',
            buffer: null
        },
        REMOVED: {
            path: 'assets/sounds/removed.wav',
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
            case "CORRECT":
            case "HAMMER":
            case "REMOVED":
                {
                    this.play(type);
                }
                break;
            default:
                break;
        }
    }

    loadAndPlay(type) {
        this.audioLoader.load(SoundManager.sounds[type].path, (buffer) => {
            SoundManager.sounds[type].buffer = buffer;
            this.sound.setBuffer(buffer);
            this.sound.setVolume(0.5);
            this.sound.play();
        }, () => { }, () => {
            console.log("Error loading sound file: " + type);
        })
    }

    private play(type) {
        if (SoundManager.sounds[type].buffer == null)
            this.loadAndPlay(type);
        else {
            this.sound.setBuffer(SoundManager.sounds[type].buffer);
            this.sound.play();
        }

    }

    static getInstance(): SoundManager {
        if (this.instance == null) this.instance = new SoundManager();
        return this.instance;
    }
}