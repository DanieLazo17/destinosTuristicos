import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destino } from 'src/app/entidades/destino';
import { Mensaje } from 'src/app/entidades/mensaje';
import { Usuario } from 'src/app/entidades/usuario';
import { ApiService } from 'src/app/servicios/api.service';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  destinos!:Array<Destino>;
  mensajes!:Array<Mensaje>;
  usuario!:Usuario;
  id!:number;

  constructor(private api: ApiService, private servicioMensajes: MensajeService, ruteo:ActivatedRoute) {
    //this.id = ruteo.snapshot.paramMap.get("id")??'0';
    this.id = servicioMensajes.MiUsuario;
    let nombre = sessionStorage.getItem("usuario")??'';
    if(this.id != null){
      this.api.enviarConGetMasRuteo('Mensaje/Usuario/' + this.id).subscribe( respuesta => {
        this.funcionARealizar(respuesta);
      })
    }
    if(this.id == null){
      let datos = new FormData();
      datos.append("nombre", nombre);
      this.api.enviarDatosPostConRuteo('Usuario/Verificacion', datos).subscribe( respuesta => {
        this.traerId(respuesta);
      });
    }
  }

  ngOnInit(): void {
  }

  funcionARealizar(respuesta:Object){
    this.mensajes = <Array<Mensaje>>respuesta;
  }

  traerId(respuesta:Object){
    this.usuario = <Usuario>respuesta;
    this.servicioMensajes.MiUsuario = this.usuario.idUsuario??0;
    this.servicioMensajes.MiNombreUsuario = this.usuario.nombre;
    this.id = this.usuario.idUsuario;
    this.api.enviarConGetMasRuteo('Mensaje/Usuario/' + this.id).subscribe( respuesta => {
      this.funcionARealizar(respuesta);
    })
  }

  verMensaje(miMensaje:Mensaje){
    this.mensajes.push(miMensaje);
  }
}