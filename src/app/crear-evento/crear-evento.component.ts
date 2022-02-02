import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  eventoForm: FormGroup;
  listRegistrado: Registrado[] = [];
  titulo = 'Crear evento';
  id: string | null;
  constructor(private fb: FormBuilder,private _registradoService: RegistradoService, private router:Router, private toastr: ToastrService,private _eventoService: EventoService,private aRouter: ActivatedRoute) {
    this.eventoForm = this.fb.group({
      titulo_evento: ['',Validators.required],
      imagen_evento: ['',Validators.required],
      mes_evento: ['',Validators.required],
      tipo_evento: ['',Validators.required],
      ano_evento: ['',Validators.required],
      dia_evento: ['',Validators.required],
      desc_evento: ['',Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
}
   agregarEvento(){
      const EVENTO: Evento = {
      titulo_evento: this.eventoForm.get('titulo_evento')?.value,
      desc_evento: this.eventoForm.get('desc_evento')?.value,
      dia_evento: this.eventoForm.get('dia_evento')?.value,
      ano_evento: this.eventoForm.get('ano_evento')?.value,
      tipo_evento: this.eventoForm.get('tipo_evento')?.value,
      mes_evento: this.eventoForm.get('mes_evento')?.value,
      imagen_evento: this.eventoForm.get('imagen_evento')?.value,
    }
    if(this.id !==null){
      
      //editamos evento
      this._eventoService.editarEvento(this.id,EVENTO).subscribe(data => {
        this.toastr.info('Evento actualizado con éxito!', 'Evento actualizado!');
        
        this.enlace();
      }, error => {
        console.log(error);
        this.eventoForm.reset();
      })
  
    }else{
      //agregamos
      console.log(EVENTO);
      this._eventoService.guardarEvento(EVENTO).subscribe(data => {
        this.toastr.success('Evento registrado con éxito!', 'Evento registrado!');
        this.enlace();
      }, error => {
        console.log(error);
        this.eventoForm.reset();
      })
  
    }
  }
 
  esEditar(){
    if(this.id !=null){
      this.titulo = 'Editar evento';

      this._eventoService.obtenerEvento(this.id).subscribe(data =>{
          this.eventoForm.setValue({
          imagen_evento: data.imagen_evento,
          mes_evento: data.mes_evento,
          tipo_evento: data.tipo_evento,
          ano_evento: data.ano_evento,
          dia_evento: data.dia_evento,
          desc_evento: data.desc_evento,
          titulo_evento: data.titulo_evento,
        })
        console.log(data.dia_evento)
      }) 
    }
  }

  enlace(){
   
      this.router.navigate(['/crudEventos']);
  }

  

}
