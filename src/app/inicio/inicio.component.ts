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

continuar(){

  //console.log(Number(this.form.value.precioUnitario),Number(this.form.value.saldoInicial))
  if(typeof this.form.value.precioUnitario ==='number' && typeof this.form.value.saldoInicial ==='number'){
    
    this.router.navigate(['/control-ingreso-gasto',Number(this.form.value.precioUnitario),Number(this.form.value.saldoInicial)])
  }
  else{

    MensajeService.monstrarMensaje({
			Tipo: 'error',
			Titulo: 'Operación fallida',
			Contenido: 'El precio unitario de la salteña y el saldo inicial debe un valor numérico.',
			confirmButtonText: 'Aceptar',
		})
  }
}
}
