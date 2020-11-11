import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { LibroMesComponent } from './pages/libro-mes/libro-mes.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent , canActivate: [ AuthGuard ] },
  { path: 'noticias'    , component: NoticiasComponent , canActivate: [ AuthGuard ] },
  { path: 'libros'    , component: LibroMesComponent , canActivate: [ AuthGuard ] },
  { path: 'login'   , component: LoginComponent },
  { path: 'registro'   , component: RegistroComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  // {useHash: true} evita que la pagina  no encuentre la ruta, por lo cual redirige a index.html 
  imports: [ RouterModule.forRoot(routes, {useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
