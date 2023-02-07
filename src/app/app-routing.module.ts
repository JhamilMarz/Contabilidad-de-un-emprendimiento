import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlIngresoGastoComponent } from './control-ingreso-gasto/control-ingreso-gasto.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'control-ingreso-gasto/:pu/:sal',
    component: ControlIngresoGastoComponent
  },
  {
    path:'**',
    redirectTo:'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
