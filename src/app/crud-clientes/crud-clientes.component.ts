import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Registrado } from '../models/registrado';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-crud-clientes',
  templateUrl: './crud-clientes.component.html',
  styleUrls: ['./crud-clientes.component.css']
})
export class CrudClientesComponent implements OnInit {
  listRegistrados: Registrado[] = [];
  id: string | null;
  constructor(private toastr: ToastrService,private _registradoService: RegistradoService,private aRouter: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('correo');
    this.obtenerRegistrados();
  }
  obtenerRegistrados(){
    this._registradoService.getRegistrados().subscribe(data => {
      console.log(data);
      this.listRegistrados = data;
    }, error =>{
      console.log(error);
    }
   )
  }

  eliminarRegistrado(id: any){
    this._registradoService.eliminarRegistrados(id).subscribe(data => {
      this.toastr.error("El usuario fue eliminado con exito", "Usuario Eliminado")
      this.obtenerRegistrados();
    },error =>{
      console.log(error);
    })
  }

  
ruta(id:any){
 
    this.router.navigate(['/editar-cliente/' + id]);

}


}
