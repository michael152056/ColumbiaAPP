import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cabeza-usuario',
  templateUrl: './cabeza-usuario.component.html',
  styleUrls: ['./cabeza-usuario.component.css'],
})
export class CabezaUsuarioComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  getNombre() {
    return localStorage.getItem('nombre');
  }
  getTipo() {
    return localStorage.getItem('tipo');
  }

  getFecha(){
    const MESES = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const f = new Date();
    var date = f.getDay() + ' '  + MESES[f.getMonth()] + ' ' + f.getFullYear() + ' | ' + f.getHours() + ':' +f.getMinutes() + ':' + f.getSeconds(); 
 return date.toString();
  }
}
