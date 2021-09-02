import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/entidades/persona';

@Component({
  selector: 'app-primer-componente',
  templateUrl: './primer-componente.component.html',
  styleUrls: ['./primer-componente.component.css']
})
export class PrimerComponenteComponent implements OnInit {
  persona:Persona;

  color:String='rojo';
  constructor() { 
    this.persona = {nombre:"Emanuel", apellido:"Lena", dni:38288000};
  }

  ngOnInit(): void {
  }

  cambiar():void {
    this.color = 'verde';
  }

  cambiarObjeto():void{
    alert(this.persona.nombre + ' ' + this.persona.apellido + ' ' + this.persona.dni);
    this.persona = {nombre:"Emanuel", apellido:"Lena", dni:38288000};
  }
}
