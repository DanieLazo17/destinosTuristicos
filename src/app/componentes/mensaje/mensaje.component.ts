import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Destino } from 'src/app/entidades/destino';
import { Mensaje } from 'src/app/entidades/mensaje';
import { ApiService } from 'src/app/servicios/api.service';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  miDestino!:Destino;
  destino!:Destino;
  miMensaje!:Mensaje;
  mensaje!:string;
  validacion!:boolean;
  estado!:boolean;
  @Output() mostrarMensaje = new EventEmitter<Mensaje>();

  constructor(private api:ApiService, private servicioMensajes:MensajeService, private ruteo: Router) {
    this.miDestino = new Destino();
    this.destino = new Destino();
    this.estado = true;
    this.validacion = true;
  }

  ngOnInit(): void {
  }

  buscar(){
    let datos = new FormData();
    datos.append("nombre", this.miDestino.nombre);
    this.api.enviarDatosPostConRuteo("Destino/Nombre", datos).subscribe( respuesta =>{
      this.funcionBuscar(respuesta);
    })
  }

  funcionBuscar(respuesta:Object){
    this.destino = <Destino>respuesta;
    if (this.destino.nombre != null) {
      this.estado = false;
    }
  }

  cancelar(){
    this.estado = true;
    this.miDestino = new Destino();
    this.destino = new Destino();
    this.mensaje = "";
  }

  validar(){
    if(this.miDestino.nombre.length >= 4 && this.miDestino.tipoTurismo.length >= 4 && this.miDestino.pais.length >=4 && this.miDestino.provincia.length >= 4 && this.mensaje.length >= 4){
      this.validacion = false;
    }
    else{
      this.validacion = true;
    }
  }

  guardarDestino(){
    this.validacion = true;
    let datos = new FormData();
    datos.append("nombre", this.miDestino.nombre);
    datos.append("tipoTurismo", this.miDestino.tipoTurismo);
    datos.append("pais", this.miDestino.pais);
    datos.append("provincia", this.miDestino.provincia);
    this.api.enviarDatosPostConRuteo("Destino/Nuevo", datos).subscribe( respuesta =>{
      this.respuestaGuardarDestino(respuesta);
    })
  }

  respuestaGuardarDestino(respuesta:Object){
    this.destino = <Destino>respuesta;
    let datos = new FormData();
    datos.append("destino", String(this.destino.idDestino));
    datos.append("usuario", String(this.servicioMensajes.MiUsuario));
    datos.append("contenido", this.mensaje);
    this.api.enviarDatosPostConRuteo("Mensaje", datos).subscribe( respuesta =>{
      this.respuestaGuardarMensaje(respuesta);
    })
  }

  respuestaGuardarMensaje(respuesta:Object){
    this.miMensaje = <Mensaje>respuesta;
    this.mostrarMensaje.emit(this.miMensaje);
    this.cancelar();
  }

  validarMensaje(){
    if(this.mensaje.length >= 4){
      this.validacion = false;
    }
    else{
      this.validacion = true;
    }
  }

  enviarMensaje(){
    this.validacion = true;
    let datos = new FormData();
    datos.append("destino", String(this.destino.idDestino));
    datos.append("usuario", String(this.servicioMensajes.MiUsuario));
    datos.append("contenido", this.mensaje);
    this.api.enviarDatosPostConRuteo("Mensaje", datos).subscribe( respuesta =>{
      this.respuestaGuardarMensaje(respuesta);
    })
  }
}
