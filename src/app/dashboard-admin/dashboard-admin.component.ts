import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  id: string | null;
  listRegistrado: Registrado[] = [];
  constructor(private fb: FormBuilder, private router:Router, private toastr: ToastrService,private _registradoService: RegistradoService,private aRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('correo');
    this.obtenerRegistrados();
    console.log(this.id)
  }

  obtenerRegistrados(){
    if(this.id !=null){
    this._registradoService.obtenerRegistrado(this.id).subscribe(data => {
      console.log(data);
      this.listRegistrado = data;
    }, error =>{
      console.log(error);
    })
  }
   
  }




}
