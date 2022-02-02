import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Noticia } from '../models/noticia';
import { NoticiaService } from '../services/noticia.service';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';



@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent implements OnInit {
  noticiaForm: FormGroup;
  titulo = 'Crear noticia';
  id: string | null;
  listRegistrado: Registrado[] = [];
  constructor(private fb: FormBuilder, private router:Router, private toastr: ToastrService,private _noticiaService: NoticiaService,private aRouter: ActivatedRoute,private _registradoService: RegistradoService) {
    this.noticiaForm = this.fb.group({
      titulo_noticia: ['',Validators.required],
      foto_noticia: ['',Validators.required],
      desc_noticia: ['',Validators.required],
      tipo_usuario: ['',Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
}
   agregarNoticia(){
    const NOTICIA: Noticia = {
      titulo_noticia: this.noticiaForm.get('titulo_noticia')?.value,
      foto_noticia: this.noticiaForm.get('foto_noticia')?.value,
      desc_noticia: this.noticiaForm.get('desc_noticia')?.value,
      tipo_usuario: this.noticiaForm.get('tipo_usuario')?.value
    }
    if(this.id !==null){
      //editamos noticia
      this._noticiaService.editarNoticia(this.id,NOTICIA).subscribe(data => {
        this.toastr.info('Noticia actualizado con éxito!', 'Noticia actualizado!');
        this.enlace()
      }, error => {
        console.log(error);
        this.noticiaForm.reset();
      })
  
    }else{
      //agregamos
      console.log(NOTICIA);
      this._noticiaService.guardarNoticia(NOTICIA).subscribe(data => {
        this.toastr.success('Noticia registrado con éxito!', 'Noticia registrado!');
        this.enlace()
      }, error => {
        console.log(error);
        this.noticiaForm.reset();
      })
  
    }
  }
  
  esEditar(){
    if(this.id !=null){
      this.titulo = 'Editar noticia';
      this._noticiaService.obtenerNoticia(this.id).subscribe(data =>{
        this.noticiaForm.setValue({
          titulo_noticia: data.titulo_noticia,
          foto_noticia: data.foto_noticia,
          desc_noticia: data.desc_noticia,
          tipo_usuario: data.tipo_usuario,
        })
      }) 
    }
  }
  
  enlace(){
 
        this.router.navigate(['/crudNoticias']);
  
  }
  

}
