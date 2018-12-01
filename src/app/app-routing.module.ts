import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'catalogo', component: CatalogoComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }