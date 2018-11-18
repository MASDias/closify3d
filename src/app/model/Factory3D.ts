import { Armario } from './armario'
import { Cabide } from './cabide'
import { Divisao } from './divisao'
import { Gaveta } from './gaveta'
import { Porta } from './porta'
import { Prateleira } from './prateleira'
import { Object3D } from 'three';
import { FocoDeLuz } from './focoDeLuz'
export class Factory3D {

    private static instance: Factory3D = null;

    constructor() {

    }

    static getInstance(): Factory3D {
        if (this.instance == null) return (this.instance = new Factory3D());
        else
            return this.instance;
    }

    create(nomeObjeto: String, largura: Number, altura: Number, profundidade: Number): Object3D {

        switch (nomeObjeto) {
            case "Porta":
                return new Porta(largura, altura);
                break;
            case "Cabide":
                return new Cabide(largura);
                break;
            case "Gaveta":
                return new Gaveta(largura, altura, profundidade);
                break;
            case "Prateleira":
                return new Prateleira(largura, profundidade);
                break;
            case "FocoDeLuz":
                return new FocoDeLuz(0, 0, 0);
            default:
                return null;
        }
    }



}