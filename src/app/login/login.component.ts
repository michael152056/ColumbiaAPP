import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    correo: '',
    clave: '',
    tipo: ''
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {  }

  signIn(){
    this.authService.signIn(this.user)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token);
          localStorage.setItem('tipo', res.tipo);
          localStorage.setItem('nombre', res.name);
          localStorage.setItem('email', res.email);
          localStorage.setItem('cedula', res.cedula);
          localStorage.setItem('ubicacion', res.ubicacion);
          localStorage.setItem('contra', res.contra);
          localStorage.setItem('celular', res.celular);

          if(localStorage.getItem('tipo') == 'administrador')  this.router.navigate(['/dashboard-admin']);
          if(localStorage.getItem('tipo') == 'empleado')  this.router.navigate(['/dashboard-cliente']);
        },
        err => console.log(err)
      )
  }

}