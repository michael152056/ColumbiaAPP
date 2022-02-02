import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Transaccion } from '../models/transaccion';
import { TransaccionService } from '../services/transaccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  listTransaccions: Transaccion[] = [];
  listVentas:  Transaccion[] = [];
  id: string | null;
  cajero: string | null;
  listRegistrado: Registrado[] = [];

  constructor(private toastr: ToastrService,private _transaccionService: TransaccionService,private _registradoService: RegistradoService,private aRouter: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('correo');
    this.obtenerTransaccions();
    this.obtenerCajero();
  }
  obtenerTransaccions(){
    this._transaccionService.getTransaccions().subscribe(data => {
      this.listTransaccions = data;
    }, error =>{
      console.log(error);
    }
   )
  }

  obtenerCajero(){
    this.cajero = localStorage.getItem('nombre');
  }

  eliminarTransaccion(id: any){
    this._transaccionService.eliminarTransaccions(id).subscribe(data => {
      this.toastr.error("El usuario fue eliminado con exito", "Usuario Eliminado")
      this.obtenerTransaccions();
    },error =>{
      console.log(error);
    })
  }

  ruta(id:any){
      this.router.navigate(['/editar-transaccion/' + id]);
  }
}
