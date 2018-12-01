import * as THREE from 'three';
export class TextureManager {

    private static instance: TextureManager;

    private assetFolder: string = 'assets/texture/';

    private texturesMap: Map<string, string>;

    protected constructor() {
        this.texturesMap = new Map();
        this.initValues();
    }
    static getInstance(): TextureManager {
        if (this.instance == null) this.instance = new TextureManager();
        return this.instance;
    }
    initValues() {
        this.addToMap("FLOOR_TEXTURE", "floor.jpg");
        this.addToMap("WOOD1_TEXTURE", "wood.png");
        this.addToMap("WOOD2_TEXTURE", "wood2.png");
        this.addToMap("WOOD3_TEXTURE", "wood3.jpg");
        this.addToMap("WOOD4_TEXTURE", "wood4.jpg");
        this.addToMap("METAL1_TEXTURE", "metal.jpg");
    }
    private addToMap(textureName: string, filename: string) {
        this.texturesMap.set(textureName, this.assetFolder + filename);
    }

    getTextures(): string[] {
        return Array.from(this.texturesMap.keys());
    }

    getFilePath(texture: string): string {
        return this.texturesMap.get(texture);
    }s

    loadTexture(texture:string):any{
        var filepath = this.getFilePath(texture);
        return new THREE.TextureLoader().load(filepath);
    }
}