import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajeService } from '../shared/service/mensaje.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  constructor(private router: Router){

  }
form = new FormGroup ({
  precioUnitario: new FormControl('',Validators.required),
  saldoInicial: new FormControl('',Validators.required)
})

get precioUnitario(): any{
  return this.form.get('precioUnitario')
}

controlIngresoGasto(){
  if(!this.validacionFormulario()){
    return
  }
  this.router.navigate(['/control-ingreso-gasto',this.form.value.precioUnitario,this.form.value.saldoInicial])
}

puntoVenta(){
  if(!this.validacionFormulario()){
    return
  }
  this.router.navigate(['/punto-venta',this.form.value.precioUnitario,this.form.value.saldoInicial])
}

validacionFormulario(){
  if(!(typeof this.form.value.precioUnitario ==='number' && typeof this.form.value.saldoInicial ==='number')){
    MensajeService.monstrarMensaje({
			Tipo: 'error',
			Titulo: 'Operación fallida',
			Contenido: 'El precio unitario de la salteña y el saldo inicial debe un valor numérico.',
			confirmButtonText: 'Aceptar',
		})
    return false
  }
  return true
}
}
