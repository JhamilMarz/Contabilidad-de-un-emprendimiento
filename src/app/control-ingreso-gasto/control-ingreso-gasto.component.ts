import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MensajeService } from '../shared/service/mensaje.service';

@Component({
  selector: 'app-control-ingreso-gasto',
  templateUrl: './control-ingreso-gasto.component.html',
  styleUrls: ['./control-ingreso-gasto.component.scss']
})
export class ControlIngresoGastoComponent implements OnInit {

  opciones=[{'clave':'123456','valor':'123456 Cuenta1'},
  {'clave':'456789','valor':'456789 Cuenta2'}]
  detalleCuentas=[{'idCuenta':'123456','tipo':'Debito'},
  {'idCuenta':'456789','tipo':'Credito'}]
constructor(private route:ActivatedRoute){
  this.valorUnitario='0'
  this.saldoInicial='0'
  this.saldoTotal =0
}
valorUnitario :string | null
saldoInicial :string | null
saldoTotal:number | null
  ngOnInit(): void {
    this.valorUnitario = this.route.snapshot.paramMap.get('pu')
    this.saldoInicial = this.route.snapshot.paramMap.get('sal')
    this.saldoTotal = typeof this.saldoInicial ==='string'?+this.saldoInicial:0
  }

  formMovimiento = new FormGroup ({
    idCuenta: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    valorContable: new FormControl(0,Validators.required)
  })
  
  get precioUnitario(): any{
    return this.formMovimiento.get('precioUnitario')
  }

  listaIngresos:any[]=[]
  keysRow:any[]=[]
  valuesRow:any[]=[]
  indice=0
  obtenerColumna(indice:number){
    this.indice=indice+1
    return Object.values(this.listaIngresos[indice])
  }


  guardar(){
    this.registrarDB()

  }
  registrarDB() {
    if(this.detalleCuentas.find(x=> x.idCuenta== this.formMovimiento.value.idCuenta)?.tipo=='Credito'){
      if(typeof this.saldoInicial==='string' && typeof this.formMovimiento.value.valorContable ==='number' && typeof this.saldoTotal ==='number')
      {
        this.saldoTotal=+this.saldoTotal-this.formMovimiento.value.valorContable
      }
      this.listaIngresos.push({'nro':this.indice,
      'cuenta':this.formMovimiento.value.idCuenta,
      'descripcion':this.formMovimiento.value.descripcion,
      'ingresos':this.formMovimiento.value.valorContable,
      'egresos':'',
      'saldo':this.saldoTotal})
    }
    else{
      if(typeof this.saldoInicial==='string' && typeof this.formMovimiento.value.valorContable ==='number' && typeof this.saldoTotal ==='number')
      {
        this.saldoTotal=+this.saldoTotal+this.formMovimiento.value.valorContable
      }
      this.listaIngresos.push({'nro':this.indice,
      'cuenta':this.formMovimiento.value.idCuenta,
      'descripcion':this.formMovimiento.value.descripcion,
      'ingresos':'0',
      'egresos':this.formMovimiento.value.valorContable,
      'saldo':this.saldoTotal})
    }

    MensajeService.monstrarMensaje({
      Tipo: 'success',
			Titulo: 'Operación exitosa',
			Contenido: 'La operación se ha realizado correctamente.',
			confirmButtonText: 'Aceptar',
    })
    this.formMovimiento.reset()
  }
}
