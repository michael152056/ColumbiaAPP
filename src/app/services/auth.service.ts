import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:4000/api'
  constructor(private http: HttpClient, private router: Router) {  }

  signIn(user: { correo: string; clave: string; }) {
    return this.http.post<any>(this.URL + '/signin',user)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('ubicacion');
    localStorage.removeItem('celular');
    localStorage.removeItem('contra');
    localStorage.removeItem('cedula');
    this.router.navigate(['/login'])
  }
}