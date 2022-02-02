import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  registradoForm: FormGroup;
  titulo = 'Crear cliente';
  correo2: string | null;
  correo: string | null;
  listRegistrado: Registrado[] = [];
  constructor(private fb: FormBuilder, private router:Router, private toastr: ToastrService,private _registradoService: RegistradoService,private aRouter: ActivatedRoute) {
    this.registradoForm = this.fb.group({
      nombres: ['',Validators.required],
      correo: ['',Validators.required],
      ubicacion: ['',Validators.required],
      celular: ['',Validators.required],
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
      clave: '1234',
      celular: this.registradoForm.get('celular')?.value,
      tipo: 'cliente',
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
        console.log(this.listRegistrado[0].correo)
        this.registradoForm.setValue({
          nombres: this.listRegistrado[0].nombres,
          correo: this.listRegistrado[0].correo,
          ubicacion: this.listRegistrado[0].ubicacion,
          celular: this.listRegistrado[0].celular,
          cedula: this.listRegistrado[0].cedula
        })
      }) 
    }
  }

  enlace(){
  
        this.router.navigate(['/crudClientes']);
     
  }

}
