import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-actualizar-datos-cliente',
  templateUrl: './actualizar-datos-cliente.component.html',
  styleUrls: ['./actualizar-datos-cliente.component.css'],
})
export class ActualizarDatosClienteComponent implements OnInit {
  registradoForm: FormGroup;
  listRegistrados: Registrado[] = [];
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _registradoService: RegistradoService,
    private router: Router
  ) {
    this.registradoForm = this.fb.group({
      ubicacion: ['', Validators.required],
      celular: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarRegistrado() {
    const REGISTRADO: Registrado = {
      nombres: localStorage.getItem('nombre') as string,
      correo: localStorage.getItem('email') as string,
      ubicacion: this.registradoForm.get('ubicacion')?.value,
      celular: this.registradoForm.get('celular')?.value,
      clave: this.registradoForm.get('clave')?.value,
      tipo: localStorage.getItem('tipo') as string,
      cedula: localStorage.getItem('cedula') as string,
    };
    //editamos registrado
    this._registradoService
      .editarRegistrado(localStorage.getItem('email') as string, REGISTRADO)
      .subscribe(
        (data) => {
          this.toastr.info(
            'Registrado actualizado con éxito!',
            'Datos actualizados!'
          );
          this.router.navigate([
            ('/actDatosCliente/' + localStorage.getItem('email') as string) ,
          ]);
        },
        (error) => {
          console.log(error);
          this.registradoForm.reset();
        }
      );
  }

  esEditar(){
    var email = this.getEmail();
    if(email !=null){
      this._registradoService.obtenerRegistrado(email).subscribe(data =>{
        this.listRegistrados = data;
        this.registradoForm.setValue({
          ubicacion: this.listRegistrados[0].ubicacion,
          celular: this.listRegistrados[0].celular,
          clave: this.listRegistrados[0].clave
        })
      }) 
    }
  }


  getNombre() {
    return localStorage.getItem('nombres');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getUbicacion() {
    return localStorage.getItem('ubicacion');
  }

  getCelular() {
    return localStorage.getItem('celular');
  }

  getClave() {
    return localStorage.getItem('contra');
  }


}
