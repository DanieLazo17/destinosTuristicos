import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destino } from 'src/app/entidades/destino';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-segundo-componente',
  templateUrl: './segundo-componente.component.html',
  styleUrls: ['./segundo-componente.component.css']
})
export class SegundoComponenteComponent implements OnInit {
  @Input() destino!:Destino;
  //Creo una instancia de la clase EventEmitter
  @Output() mostrarDestino = new EventEmitter<string>();

  numero:string;

  /*
    Inyectamos el MensajeService dentro del constructor.
    Establecemos uso de MensajeService en el constructor, con el private funciona como atributo de clase,
    sino funciona solamente dentro del contructor.

    El estado del objeto MensajeService es única para todos los componentes que la consumen, es decir,
    podemos usar sus atributos y métodos disponibles.
  */
  /*
    Inyectamos el ActivatedRoute dentro del constructor para capturar datos de la barra de direcciones.
  */
  constructor(public ms: MensajeService, ruteo:ActivatedRoute) {
    this.numero = ruteo.snapshot.paramMap.get("idDestino")??'0';
  }

  ngOnInit(): void {
    //this.ms.MiMensaje;
  }

  mostrar():void{
    //Disparamos evento
    this.mostrarDestino.emit( (this.destino.nombre??'') + ' ' +this.destino.pais??'');
  }
}
