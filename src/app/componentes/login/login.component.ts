import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { ApiService } from 'src/app/servicios/api.service';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  estado: boolean;
  usuario: Usuario;
  mensaje!: string;
  id!:number;

  constructor(private ruteo: Router, private api: ApiService, private servicioMensajes: MensajeService) {
    this.usuario = new Usuario();
    this.estado = true;
    if (sessionStorage.getItem("usuario") != null) {
      this.ruteo.navigate(["/principalcomponente"]);
    }
  }

  ngOnInit(): void {
  }

  validar() {
    var patt = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);
    var resultado = patt.test(this.usuario.contrasena);
    if (this.usuario.nombre.length >= 6 && resultado) {
      this.estado = false;
    } else {
      this.estado = true;
    }
  }

  ingresar(): void {
    let datos = new FormData();
    datos.append("nombre", this.usuario.nombre);
    datos.append("contrasena", this.usuario.contrasena);
    //La función subscribe() es asíncrono
    this.api.enviarDatosPostConRuteo("Usuario", datos).subscribe(
      respuesta => { this.funcionARealizar(respuesta)},
      //error => {alert()},
      //() => {alert('Cargando..')}
    );
  }

  funcionARealizar(respuesta:Object) {
    this.usuario = <Usuario>respuesta;
    if (this.usuario.nombre == null) {
      this.mensaje = "Correo o contraseña errónea";
    }
    if (this.usuario.nombre != null) {
      this.mensaje = "Acceso correcto";
      sessionStorage.setItem("usuario", this.usuario.nombre);
      this.servicioMensajes.MiUsuario = this.usuario.idUsuario??0;
      this.servicioMensajes.MiNombreUsuario = this.usuario.nombre;
      this.ruteo.navigate(['/principalcomponente']);
      //this.id = this.usuario.idUsuario??0;
      //this.ruteo.navigate(['/principalcomponente', this.id]);
      //this.ruteo.navigate(['/primercomponente', 100]);
    }
  }
}
