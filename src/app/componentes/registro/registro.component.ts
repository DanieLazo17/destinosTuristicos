import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  correo!:string;
  usuarioNuevo!:string;
  contrasenaNueva!:string;
  contrasenaNuevaDup!:string;
  estado: boolean;
  mensaje!: string;
  usuario!:Usuario;
  txtClave!:boolean;

  constructor(private api:ApiService) { 
    this.estado = true;
    this.txtClave = false;
  }

  ngOnInit(): void {
  }

  validar() {
    var pattCorreo = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
    var testCorreo = pattCorreo.test(this.usuario.correo);
    var patt = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);
    var resContrasenaNueva = patt.test(this.contrasenaNueva);
    var resContrasenaNuevaDup = patt.test(this.contrasenaNuevaDup);
    this.mensaje = "";
    if (this.usuarioNuevo.length >= 6 && testCorreo && resContrasenaNueva && resContrasenaNuevaDup) {
      this.estado = false;
    } else {
      this.estado = true;
    }
  }

  validarNombre():void{
    let datos = new FormData();
    datos.append("usuarioNuevo", this.usuarioNuevo);
    this.api.enviarDatosPostConRuteo('Usuario/Nuevo', datos).subscribe( respuesta => {
      this.funcionValidaNombre(respuesta);
    })
  }

  funcionValidaNombre(respuesta:Object):void{
    var resp = <any>respuesta;
    if (resp['estado']) {
      this.txtClave = true;
    } else {
      this.txtClave = false;
    }
    this.mensaje = resp['mensaje'];
  }

  subir(){
    this.estado = true;
    if(this.contrasenaNueva == this.contrasenaNuevaDup){
      let datos = new FormData();
      datos.append("nuevoCorreo", this.correo);
      datos.append("nuevoUsuario", this.usuarioNuevo);
      datos.append("nuevaContra", this.contrasenaNueva);
      this.api.enviarDatosPostConRuteo('Usuario/Registro', datos).subscribe( respuesta => {
        this.funcionARealizar(respuesta);
      });
    } else {
      (<HTMLElement>document.getElementById('mensaje')).style.color = '#ff0000';
      this.mensaje = "Las contraseñas no coinciden";
      this.contrasenaNueva = "";
      this.contrasenaNuevaDup = "";
    }
  }

  funcionARealizar(respuesta:Object){
    this.usuario = <Usuario>respuesta;
    (<HTMLElement>document.getElementById('mensaje')).style.color = '#0000ff';
    (<HTMLElement>document.getElementById('mensaje')).style.fontSize = '14px';
    this.mensaje = "Usuario " + this.usuario.nombre + " generado correctamente";
  }
}
