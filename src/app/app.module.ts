import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimerComponenteComponent } from './componentes/primer-componente/primer-componente.component';
import { SegundoComponenteComponent } from './componentes/segundo-componente/segundo-componente.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DestinosComponent } from './componentes/destinos/destinos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { DestinoComponent } from './componentes/destino/destino.component';
import { MensajeComponent } from './componentes/mensaje/mensaje.component';
import { OrdenPipe } from './transformaciones/orden.pipe';
import { FondoDirective } from './directivas/fondo.directive';

@NgModule({
  declarations: [
    AppComponent,
    PrimerComponenteComponent,
    SegundoComponenteComponent,
    NoEncontradoComponent,
    LoginComponent,
    MenuComponent,
    DestinosComponent,
    RegistroComponent,
    PrincipalComponent,
    DestinoComponent,
    MensajeComponent,
    OrdenPipe,
    FondoDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  //Para usar Inyección de Dependencia con HttpClient, debemos agregarlo dentro de providers
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
