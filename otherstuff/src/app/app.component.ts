import {Component} from '@angular/core';


@Component({
  selector: 'my-app',
  template: `
    <my-scene></my-scene>
  `,
  styles: [`
    :host {
      display: grid;
      grid-template: auto 1fr / 1fr; 
      height: 100vh;
      width: 100vw;
    }

    my-controls,
    my-scene {
      width: 100%;
    }
  `],
})
export class AppComponent {}
