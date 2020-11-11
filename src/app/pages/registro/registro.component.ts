import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
                private router: Router ) { }

  ngOnInit() {
    //inicializa modelo /models/usuario.models.ts
    this.usuario = new UsuarioModel();
  }
  onSubmit( form: NgForm ){

    if (form.invalid) {return;}

    //manda a llamar el sweetalert2
    Swal.fire({
      //restringe al usuario a salir
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    //ejecuta una ventana de loading
    Swal.showLoading();

    this.auth.registrarUsuario( this.usuario ).
    subscribe(data => {
      console.log( data );
      //cancela swealert2 loading
      Swal.close();

      //redirecciona a home si los datos son correctos
      this.router.navigateByUrl('/home');

      //si la bandera del check esta en true se aplica el localstorage
      if ( this.usuario.recordarme ) {
        localStorage.setItem('recordarme', 'true');
      }

    }, (err) =>{
      console.log( err.error.error.message );
      //manda a llamar el sweetalert2
      Swal.fire({
        //restringe al usuario a salir
        title: 'Error al registrar',
        icon: 'error',
        text: err.error.text
      });
    });
    
  }

}
