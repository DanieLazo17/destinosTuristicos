import { Component, OnInit } from '@angular/core';
import { Destino } from 'src/app/entidades/destino';
import { Mensaje } from 'src/app/entidades/mensaje';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent implements OnInit {
  destinos!: Array<Destino>;
  mensajes!: Array<Mensaje>;
  ordenes!:Array<any>;
  numeroOrden:number = 0;

  //Inyectamos el ApiService dentro del constructor para hacer una llamado a la API.
  constructor(private api: ApiService) {
    api.enviarConGetMasRuteo('Destino').subscribe( respuesta => {
      this.funcionARealizar( respuesta );
    });
    this.ordenes = [
      {numero:1, tipoOrden:"Destino más visitado"},
      {numero:2, tipoOrden:"Destino menos visitado"},
    ];
  }
  
  ngOnInit(): void {
  }

  funcionARealizar(respuesta:Object){
    this.destinos = <Array<Destino>>respuesta;
    this.destinos.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
  }

  cargarMensajes(){
    let idDestino = (<HTMLInputElement>document.getElementById('idDestino')).value;
    this.api.enviarConGetMasRuteo('Mensaje/Destino/' + idDestino).subscribe( respuesta => {
      this.mostrarMensajes(respuesta);
    });
  }

  mostrarMensajes(respuesta:Object){
    this.mensajes = <Array<Mensaje>>respuesta;
  }

  ordenarPor(){
    this.numeroOrden = Number((<HTMLInputElement>document.getElementById('numero')).value);
  }
}