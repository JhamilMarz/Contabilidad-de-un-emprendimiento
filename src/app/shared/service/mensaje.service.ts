import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class MensajeService{
    static async monstrarMensaje(Mensaje:any): Promise<boolean>{
        var vResultadoMensaje = await Swal.fire({
			icon: Mensaje.Tipo,
			title: Mensaje.Titulo,
			text: Mensaje.Contenido ?? '',
			html: Mensaje.Html ?? '',
			showDenyButton: Mensaje.MostrarBotonCancelar ?? false,
			confirmButtonText: Mensaje.TextoBotonConfirmacion ?? 'Aceptar',
			denyButtonText: Mensaje.TextoBotonCancelar ?? 'Cancelar',
		});
		return vResultadoMensaje.isConfirmed;
    }
}