import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  registradoForm: FormGroup;
  titulo = 'Crear registrado';
  correo2: string | null;
  correo: string | null;
  listRegistrado: Registrado[] = [];
  constructor(private fb: FormBuilder, private router:Router, private toastr: ToastrService,private _registradoService: RegistradoService,private aRouter: ActivatedRoute) {
    this.registradoForm = this.fb.group({
      nombres: ['',Validators.required],
      correo: ['',Validators.required],
      clave: ['',Validators.required],
      ubicacion: ['',Validators.required],
      celular: ['',Validators.required],
      tipo:  ['',Validators.required],
      cedula: ['',Validators.required]

    })
    this.correo2 = this.aRouter.snapshot.paramMap.get('correo2');
    console.log(this.correo2)
   }

  ngOnInit(): void {
    this.obtenerRegistrados();
    this.esEditar();
  }
  agregarRegistrado(){
    const REGISTRADO: Registrado = {
      nombres: this.registradoForm.get('nombres')?.value,
      correo: this.registradoForm.get('correo')?.value,
      ubicacion: this.registradoForm.get('ubicacion')?.value,
      clave: this.registradoForm.get('clave')?.value,
      celular: this.registradoForm.get('celular')?.value,
      tipo: this.registradoForm.get('tipo')?.value,
      cedula: this.registradoForm.get('cedula')?.value
    }
    if(this.correo2 !==null){
      //editamos registrado
      this._registradoService.editarRegistrado(this.correo2,REGISTRADO).subscribe(data => {
        this.toastr.info('Usuario actualizado con éxito!', 'Usuario actualizado!');
        this.enlace()
      }, error => {
        console.log(error);
        this.registradoForm.reset();
      })
  
    }else{
      //agregamos
      console.log(REGISTRADO);
      this._registradoService.guardarRegistrado(REGISTRADO).subscribe(data => {
        this.toastr.success('Usuario registrado con éxito!', 'Usuario registrado!');
        this.enlace()
      }, error => {
        console.log(error);
        this.registradoForm.reset();
      })
  
    }
  }

  
  obtenerRegistrados(){
    if(this.correo2 !=null){
    this._registradoService.obtenerRegistradoOne(this.correo2).subscribe(data => {
      console.log(data);
      this.listRegistrado = data;
    }, error =>{
      console.log(error);
    })
  }
   
  }


  esEditar(){
    if(this.correo2 !=null){
      this.titulo = 'Editar registrado';
      this._registradoService.obtenerRegistradoOne(this.correo2).subscribe(data =>{
        this.listRegistrado = data;
        console.log(data)
        this.registradoForm.setValue({
          nombres: this.listRegistrado[0].nombres,
          correo: this.listRegistrado[0].correo,
          ubicacion: this.listRegistrado[0].ubicacion,
          celular: this.listRegistrado[0].celular,
          clave: this.listRegistrado[0].clave,
          tipo: this.listRegistrado[0].tipo,
          cedula: this.listRegistrado[0].cedula
        })
      }) 
    }
  }

  enlace(){
  
        this.router.navigate(['/crudUsuarios']);
     
  }
  
  

}
