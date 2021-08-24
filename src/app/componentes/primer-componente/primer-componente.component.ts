import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/entidades/persona';

@Component({
  selector: 'app-primer-componente',
  templateUrl: './primer-componente.component.html',
  styleUrls: ['./primer-componente.component.css']
})
export class PrimerComponenteComponent implements OnInit {
  persona:Persona | undefined;

  color:String='rojo';
  constructor() { }

  ngOnInit(): void {
  }

  cambiar():void {
    this.color = 'verde';
  }
}
