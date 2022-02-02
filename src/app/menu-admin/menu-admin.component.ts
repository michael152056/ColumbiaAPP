import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registrado } from '../models/registrado';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RegistradoService } from '../services/registrado.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  constructor(private router:Router,public authService: AuthService) { }

  ngOnInit(): void {
  
  }


  actDatos(){
    this.router.navigate(['/actDatos/' + this.getEmail()]);
}

reservas(){
  this.router.navigate(['/crudHorarios/' + this.getEmail()]);

}

getEmail(){
  return localStorage.getItem('email');
}

/* 
usuarios(){
  if(this.id !=null){
  this._registradoService.obtenerRegistrado(this.id).subscribe(data => {
    this.listRegistrado = data;
    var getEmail() = this.listRegistrado[0].getEmail();
    this.router.navigate(['/crudUsuarios/' + getEmail()]);
  }, error =>{
    console.log(error);
  })
}
}

eventos(){
  if(this.id !=null){
  this._registradoService.obtenerRegistrado(this.id).subscribe(data => {
    this.listRegistrado = data;
    var getEmail() = this.listRegistrado[0].getEmail();
    this.router.navigate(['/crudEventos/' + getEmail()]);
  }, error =>{
    console.log(error);
  })
}
}

noticias(){
  if(this.id !=null){
  this._registradoService.obtenerRegistrado(this.id).subscribe(data => {
    this.listRegistrado = data;
    var getEmail() = this.listRegistrado[0].getEmail();
    this.router.navigate(['/crudNoticias/' + getEmail()]);
  }, error =>{
    console.log(error);
  })
}
} */

}
