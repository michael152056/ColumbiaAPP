import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Horario } from '../models/horario';
import { HorarioService } from '../services/horario.service';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';


@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})
export class CrearHorarioComponent implements OnInit {
  horarioForm: FormGroup;
  titulo = 'Crear horario';
  id: string | null;
  listRegistrado: Registrado[] = [];
  constructor(private fb: FormBuilder, private router:Router, private toastr: ToastrService,private _horarioService: HorarioService,private aRouter: ActivatedRoute,private _registradoService: RegistradoService) {
    this.horarioForm = this.fb.group({
      correo: ['',Validators.required],
      nombres: ['',Validators.required],
      laboratorio: ['',Validators.required],
      cargo: ['',Validators.required],
      carrera: ['',Validators.required],
      nivel: ['',Validators.required],
      materia: ['',Validators.required],
      cantidad_estudiantes: ['',Validators.required],
      fecha: ['',Validators.required],
      hora: ['',Validators.required],
      hora2: ['',Validators.required],
      actividades: ['',Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
}
   agregarHorario(){
    const HORARIO: Horario = {
      correo: this.horarioForm.get('correo')?.value,
      nombres: this.horarioForm.get('nombres')?.value,
      laboratorio: this.horarioForm.get('laboratorio')?.value,
      cargo: this.horarioForm.get('cargo')?.value,
      carrera: this.horarioForm.get('carrera')?.value,
      nivel: this.horarioForm.get('nivel')?.value,
      materia: this.horarioForm.get('materia')?.value,
      cantidad_estudiantes: this.horarioForm.get('cantidad_estudiantes')?.value,
      fecha: this.horarioForm.get('fecha')?.value,
      hora: this.horarioForm.get('hora')?.value + ' - ' +  this.horarioForm.get('hora2')?.value,
      actividades: this.horarioForm.get('actividades')?.value,
    }
    if(this.id !==null){
      //editamos horario
      this._horarioService.editarHorario(this.id,HORARIO).subscribe(data => {
        this.toastr.info('Horario actualizado con éxito!', 'Horario actualizado!');
        this.router.navigate(['/crudHorarios']);
      }, error => {
        console.log(error);
        this.horarioForm.reset();
      })
  
    }else{
      //agregamos
      console.log(HORARIO);
      this._horarioService.guardarHorario(HORARIO).subscribe(data => {
        this.toastr.success('Horario registrado con éxito!', 'Horario registrado!');
        this.router.navigate(['/crudHorarios']);
      }, error => {
        console.log(error);
        this.horarioForm.reset();
      })
  
    }
  }
 
  esEditar(){
    if(this.id !=null){
      this.titulo = 'Editar horario';
      this._horarioService.obtenerHorario(this.id).subscribe(data =>{
        const split = (data.hora).split('-');
        const inicio = split[0].replace(/ /g, "");
        const fin = split[1].replace(/ /g, "");
        this.horarioForm.setValue({
          correo: data.correo,
          nombres: data.nombres,
          laboratorio: data.laboratorio,
          cargo: data.cargo,
          carrera: data.carrera,
          nivel: data.nivel,
          materia: data.materia,
          cantidad_estudiantes: data.cantidad_estudiantes,
          fecha: data.fecha,
          hora: inicio,
          hora2: fin,
          actividades: data.actividades
        })
      }) 
    }
  }



}
