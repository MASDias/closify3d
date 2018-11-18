import * as Controlkit from 'controlkit';
import {Armario} from '../model/armario'
export class CreateArmarioGUI {

    public structure: {
        largura,
        altura,
        profundidade
    };

    public controlkit;

    public callback_create_armario;

    constructor(cb) {
        this.controlkit = new Controlkit();
        this.structure = {
            largura: 1,
            altura: 1,
            profundidade: 1
        }
        this.initPanel(cb);
    }

    initPanel(cb) {
        var panel = this.controlkit.addPanel(
            {
                label: 'Create Armario',
                align: 'left',
                position: [10, 10]
            }
        )
        var armarioGroup = panel.addGroup(
            {
                label: "Create",
                enable: true
            }
        )
        armarioGroup.addNumberInput(this.structure, 'largura');
        armarioGroup.addNumberInput(this.structure, 'altura');
        armarioGroup.addNumberInput(this.structure, 'profundidade');
        armarioGroup.addButton('Create', () => {

            var a:Armario = new Armario(this.structure.largura, this.structure.altura, this.structure.profundidade);
            cb(a);

        });
    }
    update() {
        this.controlkit.update();
    }
}