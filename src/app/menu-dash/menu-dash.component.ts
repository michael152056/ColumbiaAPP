import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registrado } from '../models/registrado';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RegistradoService } from '../services/registrado.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-dash',
  templateUrl: './menu-dash.component.html',
  styleUrls: ['./menu-dash.component.css']
})
export class MenuDashComponent implements OnInit {
  correo: string;
  id: string | null;
  listRegistrado: Registrado[] = [];
  constructor(private fb: FormBuilder, private router:Router, private toastr: ToastrService,private _registradoService: RegistradoService,private aRouter: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
   
  }

  actDatos(){
    this.router.navigate(['/actDatosCliente/' + this.getEmail()]);
}

getEmail(){
  return localStorage.getItem('email');
}





}
