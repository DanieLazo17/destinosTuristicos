import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuarioNuevo!:string;
  contrasenaNueva!:string;
  contrasenaNuevaDup!:string;
  estado: boolean;
  mensaje!: string;
  usuario!:Usuario;

  constructor(private api:ApiService) { 
    this.estado = true;
  }

  ngOnInit(): void {
  }

  validar() {
    var patt = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);
    var resContrasenaNueva = patt.test(this.contrasenaNueva);
    var resContrasenaNuevaDup = patt.test(this.contrasenaNuevaDup);
    this.mensaje = "";
    if (this.usuarioNuevo.length >= 6 && resContrasenaNueva && resContrasenaNuevaDup) {
      this.estado = false;
    } else {
      this.estado = true;
    }
  }

  subir(){
    this.estado = true;
    if(this.contrasenaNueva == this.contrasenaNuevaDup){
      let datos = new FormData();
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
