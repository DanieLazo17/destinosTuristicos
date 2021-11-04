import { Component, Input, OnInit } from '@angular/core';
import { Destino } from 'src/app/entidades/destino';
import { Mensaje } from 'src/app/entidades/mensaje';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css']
})
export class DestinoComponent implements OnInit {
  @Input() mensaje!:Mensaje;
  destino!:Destino;
  estado!:boolean;

  constructor(private api: ApiService) {
    this.estado = false;
  }

  ngOnInit(): void {
    this.api.enviarConGetMasRuteo('Destino/' + this.mensaje.destino).subscribe( respuesta => {
      this.funcionARealizar(respuesta);
    })
  }

  funcionARealizar(respuesta:Object){
    this.destino = <Destino>respuesta;
  }

  editar(){
    this.estado = true;
  }

  guardar(){
    let datos = new FormData();
    datos.append("destino", this.mensaje.destino);
    datos.append("contenido", this.mensaje.contenido);
    this.api.enviarDatosPostConRuteo('Mensaje/' + this.mensaje.idMensaje, datos).subscribe( respuesta => {
      this.funcionEditar(respuesta);
    });
  }

  cancelar(){
    this.estado = false;
  }

  funcionEditar(respuesta:Object){
    this.estado = false;
    alert('Se actualizó mensaje');
  }

  borrar(){
    if (confirm("¿Está seguro de borrar su viaje a " + this.destino.nombre + "?")) {
      this.api.enviarConDeleteMasRuteo('Mensaje/Borrar/' + this.mensaje.idMensaje).subscribe( respuesta => {
        this.funcionBorrar(respuesta);
      });
    }
  }

  funcionBorrar(respuesta:Object){
    alert('Se borró mensaje');
  }
}
