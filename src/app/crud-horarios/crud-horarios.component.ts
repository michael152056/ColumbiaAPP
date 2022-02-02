import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Horario } from '../models/horario';
import { HorarioService } from '../services/horario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud-horarios',
  templateUrl: './crud-horarios.component.html',
  styleUrls: ['./crud-horarios.component.css'],
})
export class CrudHorariosComponent implements OnInit {
  listHorarios: Horario[] = [];
  id: string | null;
  constructor(
    private toastr: ToastrService,
    private _horarioService: HorarioService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('correo');
    this.obtenerHorarios();
  }
  obtenerHorarios() {
    this._horarioService.getHorarios().subscribe(
      (data) => {
        console.log(data);
        this.listHorarios = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarHorario(id: any) {
    this._horarioService.eliminarHorarios(id).subscribe(
      (data) => {
        this.toastr.error(
          'El usuario fue eliminado con exito',
          'Usuario Eliminado'
        );
        this.obtenerHorarios();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ruta(id: any) {
    this.router.navigate(['/editar-horario/' + id]);
  }
}
