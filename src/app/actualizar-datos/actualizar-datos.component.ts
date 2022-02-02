import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.css']
})
export class ActualizarDatosComponent implements OnInit {
  listRegistrados: Registrado[] = [];
  registradoForm: FormGroup;
  id: string | null;
  constructor( private router:Router,private toastr: ToastrService,private fb: FormBuilder,private _registradoService: RegistradoService,private aRouter: ActivatedRoute) {
     
      this.registradoForm = this.fb.group({
        ubicacion: ['',Validators.required],
        celular: ['',Validators.required],
        clave: ['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('correo');
    this.obtenerRegistrados();
    console.log(this.id)
    this.esEditar();
  }

  agregarRegistrado(){

    if(this.id !==null){
          
    const REGISTRADO: Registrado = {
      nombres: this.listRegistrados[0].nombres,
      correo: this.listRegistrados[0].correo,
      ubicacion: this.registradoForm.get('ubicacion')?.value,
      celular: this.registradoForm.get('celular')?.value,
      clave: this.registradoForm.get('clave')?.value,
      tipo: this.listRegistrados[0].tipo,
      cedula: this.listRegistrados[0].cedula
    }
      //editamos registrado
      this._registradoService.editarRegistrado(this.id,REGISTRADO).subscribe(data => {
        this.toastr.info('Registrado actualizado con éxito!', 'Datos actualizados!');
        this.router.navigate(['/actDatos/' + this.id]);
        
      }, error => {
        console.log(error);
        this.registradoForm.reset();
      })
    }else{
      console.log("Agregamos?");
    }
  
    
  }



  obtenerRegistrados(){
    if(this.id !=null){
    this._registradoService.obtenerRegistrado(this.id).subscribe(data => {
      console.log(data);
      this.listRegistrados = data;
    }, error =>{
      console.log(error);
    })
  }
   
  }

  esEditar(){
    console.log(this.id);
    if(this.id !=null){
      this._registradoService.obtenerRegistrado(this.id).subscribe(data =>{
        console.log(this.listRegistrados[0].ubicacion)
        this.registradoForm.setValue({
          ubicacion: this.listRegistrados[0].ubicacion,
          celular: this.listRegistrados[0].celular,
          clave: this.listRegistrados[0].clave
        })
      }) 
    }
  }


}
