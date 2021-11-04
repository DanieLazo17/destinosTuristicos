import { Pipe, PipeTransform } from '@angular/core';
import { Destino } from '../entidades/destino';
import { ApiService } from '../servicios/api.service';

@Pipe({
  name: 'orden'
})
export class OrdenPipe implements PipeTransform {
  destinos!:Array<any>;

  constructor(private api: ApiService){
    this.api.enviarConGetMasRuteo('Destino/Orden').subscribe( respuesta => {
      this.destinos = <any>respuesta;
    });
  }

  transform(value: Array<Destino>, ...args: number[]): Array<Destino> {
    switch (args[0]) {
      case 1:
        let misDestinos:Array<any> = JSON.parse(JSON.stringify(this.destinos));
        return misDestinos.reverse();
        //return destinos.sort();
      case 2:
        return this.destinos;
        //return destinos.reverse();
      default:
        return value;
    }
  }
}
