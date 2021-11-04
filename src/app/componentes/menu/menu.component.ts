import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private ruteo: Router, public servicioMensajes: MensajeService) {
  }

  ngOnInit(): void {
  }

  salir():void{
    sessionStorage.removeItem("usuario");
    this.servicioMensajes.MiNombreUsuario = "";
    this.ruteo.navigate([""]);
  }

}
