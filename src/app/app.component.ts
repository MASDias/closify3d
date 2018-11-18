import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `
    <div class="parent">
      <my-scene></my-scene>
      <app-object-control></app-object-control>
    </div>
  `,
  styleUrls: [
    "./app.component.css"
  ]
})
export class AppComponent { }
