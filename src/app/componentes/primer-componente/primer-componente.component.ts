import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destino } from 'src/app/entidades/destino';
import { Persona } from 'src/app/entidades/persona';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-primer-componente',
  templateUrl: './primer-componente.component.html',
  styleUrls: ['./primer-componente.component.css']
})
export class PrimerComponenteComponent implements OnInit {
  persona:Persona;
  destinos: Array<Destino>;

  color:String='rojo';

  numero:string;

  /*
    Inyectamos el MensajeService dentro del constructor.
    Establecemos uso de MensajeService en el constructor, con el private funciona como atributo de clase,
    sino funciona solamente dentro del contructor.
  */
  constructor(private servicioMensajes: MensajeService, ruteo:ActivatedRoute) { 
    this.persona = {nombre:"Emanuel", apellido:"Lena", dni:38288000};
    this.destinos = [{ idDestino:1, nombre:"Machu Picchu", tipoTurismo:"Cultural", pais:"Perú", provincia:"Cusco" },
    { idDestino:2, nombre:"Cataratas", tipoTurismo:"Natural", pais:"Argentina", provincia:"Misiones" },
    { idDestino:3, nombre:"Valle de la Luna", tipoTurismo:"Natural", pais:"Argentina", provincia:"San Juan" }];

    this.numero = ruteo.snapshot.paramMap.get("numero")??'-28';
  }

  ngOnInit(): void {
  }

  cambiar():void {
    this.color = 'verde';
  }

  //Invocamos al MensajeService
  cambiarObjeto():void{
    alert(this.persona.nombre + ' ' + this.persona.apellido + ' ' + this.persona.dni);
    this.persona = {nombre:"Emanuel", apellido:"Lena", dni:38288000};

    //A mi objeto servicioMensajes del tipo MensajeService le asignó mi mensaje.
    this.servicioMensajes.MiMensaje = (this.persona.dni??0).toString();
  }

  verDestino(texto:string):void{
    alert(texto);
  }

}
