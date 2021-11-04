import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinosComponent } from './componentes/destinos/destinos.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PrimerComponenteComponent } from './componentes/primer-componente/primer-componente.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SegundoComponenteComponent } from './componentes/segundo-componente/segundo-componente.component';
import { ValidadorGuard } from './validaciones/validador.guard';
//Arreglo de rutas
const routes: Routes = [
  /*
  La propiedad canActivate ejecuta un método de la interfaz CanActivate. 
  La clase ValidadorGuard implementa la interfaz CanActivate.
  */
  {path:'primercomponente', component:PrimerComponenteComponent, canActivate:[ValidadorGuard],
    children:[{path:'segundocomponente', component:SegundoComponenteComponent}]
  },
  {path:'primercomponente/:numero', component:PrimerComponenteComponent, canActivate:[ValidadorGuard]},
  {path:'principalcomponente', component:PrincipalComponent, canActivate:[ValidadorGuard]},
  //{path:'principalcomponente/:id', component:PrincipalComponent, canActivate:[ValidadorGuard]},
  {path:'registro', component:RegistroComponent},
  {path:'destinoscomponente', component:DestinosComponent},
  {path:'segundocomponente', component:SegundoComponenteComponent},
  {path:'segundocomponente/:idDestino', component:SegundoComponenteComponent},
  {path:'contacto', redirectTo:'/primercomponente/segundocomponente'},
  {path:'primer', redirectTo:'/primercomponente'},
  {path:'', component:LoginComponent},
  {path:'**', component:NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
