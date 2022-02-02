import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-crud-eventos',
  templateUrl: './crud-eventos.component.html',
  styleUrls: ['./crud-eventos.component.css']
})
export class CrudEventosComponent implements OnInit {
  listEventos: Evento[] = [];
  id: string | null;
  listRegistrado: Registrado[] = [];

  constructor(private toastr: ToastrService,private _eventoService: EventoService,private _registradoService: RegistradoService,private aRouter: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('correo');
    this.obtenerEventos();
  }
  obtenerEventos(){
    this._eventoService.getEventos().subscribe(data => {
      console.log(data);
      this.listEventos = data;
    }, error =>{
      console.log(error);
    }
   )
  }

  eliminarEvento(id: any){
    this._eventoService.eliminarEventos(id).subscribe(data => {
      this.toastr.error("El usuario fue eliminado con exito", "Usuario Eliminado")
      this.obtenerEventos();
    },error =>{
      console.log(error);
    })
  }

  ruta(id:any){
      this.router.navigate(['/editar-evento/' + id]);
  }


}
