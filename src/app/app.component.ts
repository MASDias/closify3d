import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `
    <div class="parent">
      <my-scene></my-scene>
      <div class="floating_button">
      <app-floating-button></app-floating-button>
      </div>
      <app-object-control></app-object-control>
    </div>
  `,
  styleUrls: [
    "./app.component.css"
  ]
})
export class AppComponent { }
