import * as Controlkit from 'controlkit';

export class CreateArmarioGUI {

    public structure: {
        largura,
        altura,
        profundidade
    };

    public controlkit;

    constructor() {
        this.controlkit = new Controlkit();
        this.structure = {
            largura: 1,
            altura: 1,
            profundidade: 1
        }
        this.initPanel();
    }

    initPanel() {
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
        var subGroup = armarioGroup.addSubGroup();
        subGroup.addNumberInput(this.structure, 'largura');
        subGroup.addNumberInput(this.structure, 'altura');
        subGroup.addNumberInput(this.structure, 'profundidade');
    }
    update(){
        this.controlkit.update();
    }
}