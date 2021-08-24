import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimerComponenteComponent } from './componentes/primer-componente/primer-componente.component';
import { SegundoComponenteComponent } from './componentes/segundo-componente/segundo-componente.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimerComponenteComponent,
    SegundoComponenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
