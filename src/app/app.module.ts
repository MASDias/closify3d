import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppComponent} from './app.component';
import {ConfigService} from './config.service';
import {SceneComponent} from './scene.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    ConfigService,
  ],
  declarations: [
    AppComponent,
    SceneComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
