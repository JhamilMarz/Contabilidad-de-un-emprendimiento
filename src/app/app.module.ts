import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ControlIngresoGastoComponent } from './control-ingreso-gasto/control-ingreso-gasto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ControlIngresoGastoComponent,
    PuntoVentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
