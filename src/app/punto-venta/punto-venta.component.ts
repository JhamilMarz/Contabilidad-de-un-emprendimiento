import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MensajeService } from '../shared/service/mensaje.service';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.scss']
})
export class PuntoVentaComponent {
  numeroFactura='00001'
  datosPersona =[{'idPersona':'6795906LP', 'nombreCompletoPersona':'YAMIL HUGO MARZANA PERALTA', 'celular':'73597423'},
  {'idPersona':'1', 'nombreCompletoPersona':'TEST1', 'celular':'12334567'},
  {'idPersona':'2', 'nombreCompletoPersona':'TEST2', 'celular':'23445667'},
]
opcionesIdProducto=[{'clave':'123','valor':'123 - Salteña de carne simple'},
{'clave':'124','valor':'124 - Salteña de pollo simple'},
{'clave':'125','valor':'125 - Salteña de carne picante'}
]
datosProducto=[
  { 'idProducto': '123', 'precioUnitario': 5, 'detalle': 'Salteña de carne simple'},
  { 'idProducto': '124', 'precioUnitario': 6, 'detalle': 'Salteña de pollo simple'},
  { 'idProducto': '125', 'precioUnitario': 8, 'detalle': 'Salteña de carne picante'},
]
  listaVentas: any[]=[]
  indice:number =0
  constructor(){
  }
  formDetalleFactura = new FormGroup ({
    numeroFactura: new FormControl(this.numeroFactura,Validators.required),
    fechaFactura: new FormControl(formatDate (new Date(),'yyyy-MM-dd', 'en'),Validators.required),
    idPersona: new FormControl('',Validators.required),
    nombreCompletoPersona: new FormControl('',Validators.required),
    celular: new FormControl('',Validators.required),
  })

  formDetalleVenta = new FormGroup ({
    idProducto: new FormControl('',Validators.required),
    cantidad: new FormControl(0,Validators.required),
    precioUnitario: new FormControl(0,Validators.required),
    valorTotal: new FormControl(0,Validators.required),
  })

  get controlDetalleFactura(){
    return this.formDetalleFactura.get('controlDetalleFactura')
  }

  get controlDetalleVenta(){
    return this.formDetalleVenta.get('controlDetalleVenta')
  }

  onFoucusOut(){
    let nombreCompletoPersona = this.datosPersona.find(x=> x.idPersona===this.formDetalleFactura.value.idPersona)?.nombreCompletoPersona
    this.formDetalleFactura.controls.nombreCompletoPersona.setValue(nombreCompletoPersona??'')
    let celular = this.datosPersona.find(x=> x.idPersona===this.formDetalleFactura.value.idPersona)?.celular
    this.formDetalleFactura.controls.celular.setValue(celular??'')
  }

  cambioIdProducto(evento: any){
    let precioUnitario = this.datosProducto.find(x=> x.idProducto===evento.value)?.precioUnitario
    this.formDetalleVenta.controls.precioUnitario.setValue(precioUnitario??null)
  }

  cambioCantidad(evento: any){
    if(typeof this.formDetalleVenta.value.cantidad ==='number' && typeof this.formDetalleVenta.value.precioUnitario === 'number')
   {let valorTotal = this.formDetalleVenta.value.cantidad*this.formDetalleVenta.value.precioUnitario
    this.formDetalleVenta.controls.valorTotal.setValue(valorTotal??0)
  }
  }

  registrarVenta(){
    if(!this.validarFormulario()){
      return
    }

    let nombreArticulo = this.datosProducto.find(x=>x.idProducto ===this.formDetalleVenta.value.idProducto)?.detalle
    this.listaVentas.push({'nro':this.indice,
    'codigo':this.formDetalleVenta.value.idProducto,
    'articulo':nombreArticulo,
    'cantidad':this.formDetalleVenta.value.cantidad,
    'precio':this.formDetalleVenta.value.precioUnitario,
    'valorTotal':this.formDetalleVenta.value.valorTotal})
    this.formDetalleVenta.reset()
  }
  validarFormulario() {
    if(this.formDetalleVenta.value.cantidad ==0){
      MensajeService.monstrarMensaje({
        Tipo: 'error',
        Titulo: 'Operación fallida',
        Contenido: 'La cantidad debe ser mayor a cero.',
        confirmButtonText: 'Aceptar',
      })
      return false
    }
    return true
  }

  obtenerColumna (indice: number){
    this.indice=indice+1
    return Object.values(this.listaVentas[indice])
  }
}
