import { Injectable } from '@angular/core';

/*
  Decorador @Injectable para poder realizar Inyección de Dependencia, es decir,
  por medio de la palabra de la clase buscó la referencia del objeto de dicha clase.
  Como nuestro proveedor es el root, vamos a tener una sola instancia durante todo nuestro programa.

  Cualquier dato que querramos compartir, usamos la clase MensajeService, mediante Inyección de Dependencia,
  para establecer algunas de sus propiedades.
*/
@Injectable({
  providedIn: 'root'
})

export class MensajeService {
  
  private miMensaje !: string;
  
  public get MiMensaje() : string {
    return this.miMensaje;
  }
  public set MiMensaje(v : string) {
    this.miMensaje = v;
  }
  
  private miUsuario !: number;
  
  public get MiUsuario() : number {
    return this.miUsuario;
  }
  public set MiUsuario(v : number) {
    this.miUsuario = v;
  }

  private miNombreUsuario : string = '';

  public get MiNombreUsuario() : string {
    return this.miNombreUsuario;
  }
  public set MiNombreUsuario(v : string) {
    this.miNombreUsuario = v;
  }
  
  constructor() { }
}
