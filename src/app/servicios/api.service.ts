import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Inyectamos un HttpClient dentro del constructor
  //Agregando private al parámetro clienteHttp generamos un atributo perteneciente a la clase ApiService.
  constructor(private clienteHttp: HttpClient) {
  }

  //Usamos el objeto clienteHttp en un método de la clase ApiService.
  traerConGet(){
    /*
      El objeto clienteHttp nos expone una serie de métodos que tienen mucha relación
      con los adverbios que podemos llamar. Podemos llamar a la API con algunos de estos adverbios.
    */

    /*
      Desde el objeto clienteHttp llamamos al método get() y nos devuelve un dato de tipo Observable
      Un dato de tipo Observable es similar al funcionamiento de AJAX (01:00:50).
      Dentro del método subscribe() va la función anónima que se ejecuta cuando mi petición retorne el response.
    */
    //this.clienteHttp.get('http://localhost/provincias/Backend/').subscribe( response => {});

    /*
      Cuando estamos en esta API no sabemos que hará la función anónima, para eso podemos retornar el Observable.
      Si retornamos el Observable, quien se va ser cargo de qué hacer con la respuesta será quien llame al método traerConGet()
    */
    return this.clienteHttp.get("https://servidordestino.herokuapp.com/Destino");
    //return this.clienteHttp.get("http://localhost/provincias/Backend/");
  }

  enviarDatosPost(datos:FormData){
    return this.clienteHttp.post("https://servidordestino.herokuapp.com/", datos);
  }

  enviarDatosPostConRuteo(ruteo:string, datos:FormData){
    return this.clienteHttp.post("https://servidordestino.herokuapp.com/" + ruteo, datos);
  }

  enviarDatosPutConRuteo(ruteo:string, datos:FormData){
    return this.clienteHttp.put("https://servidordestino.herokuapp.com/" + ruteo, datos);
  }

  enviarConGet(){
    return this.clienteHttp.get("https://servidordestino.herokuapp.com/");
  }

  enviarConGetMasRuteo(ruteo:string){
    return this.clienteHttp.get("https://servidordestino.herokuapp.com/" + ruteo);
  }

  enviarConDeleteMasRuteo(ruteo:string){
    return this.clienteHttp.delete("https://servidordestino.herokuapp.com/" + ruteo);
  }
}
