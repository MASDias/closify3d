import * as Controlkit from "controlkit";
import { Armario } from "../model/armario";
import { Factory3D } from "../model/Factory3D";
export class CreateArmarioGUI {
  public structure: {
    largura;
    altura;
    profundidade;
  };
  public structureComponenteMedidas: {
    largura;
    altura;
    profundidade;
  };
  public components_structure: {
    componentes;
    selecionado
  };

  public select_target: {
    gaveta;
  };
  public controlkit;
  public static instance;
  public scene;

  constructor(scene, cb) {
    CreateArmarioGUI.instance = this;
    this.controlkit = new Controlkit();
    this.structure = {
      largura: 15,
      altura: 15,
      profundidade: 15
    };
    this.components_structure = {
      componentes: ["Porta", "Cabide", "Gaveta", "Prateleira", "FocoDeLuz"],
      selecionado: 'Porta'
    };
    this.structureComponenteMedidas = {
      largura: 15,
      altura: 15,
      profundidade: 15
    };
    this.scene = scene;
    this.initPanel();
  }

  initPanel() {
    var panel = this.controlkit.addPanel({
      label: "Create Armario",
      align: "left",
      opacity: 0.9
    });
    this.controlkit
      .addPanel({
        label: "Componente",
        align: "left",
        opacity: 0.9
      })
      .addGroup({
        label: "Criar Componente"
      })
      .addSelect(this.components_structure, 'componentes', {
        label: "Selecionar", onChange: function (index) {
          CreateArmarioGUI.instance.components_structure.selecionado = CreateArmarioGUI.instance.components_structure.componentes[index];
        }
      })
      .addNumberInput(this.structureComponenteMedidas, "largura")
      .addNumberInput(this.structureComponenteMedidas, "altura")
      .addNumberInput(this.structureComponenteMedidas, "profundidade")
      .addButton('Criar', () => {

        var componente = Factory3D.getInstance().create(this.components_structure.selecionado, this.structureComponenteMedidas.altura, this.structureComponenteMedidas.largura, this.structureComponenteMedidas.largura);
        this.scene.adicionarComponente(componente);
      });
    var armarioGroup = panel.addGroup({
      label: "Create",
      enable: true
    });
    armarioGroup.addNumberInput(this.structure, "largura");
    armarioGroup.addNumberInput(this.structure, "altura");
    armarioGroup.addNumberInput(this.structure, "profundidade");
    armarioGroup.addButton("Create", () => {
      var a: Armario = new Armario(
        this.structure.largura,
        this.structure.altura,
        this.structure.profundidade
      );
      this.scene.createArmarioAddScene(a);
    });
  }
  update() {
    this.controlkit.update();
  }
}
