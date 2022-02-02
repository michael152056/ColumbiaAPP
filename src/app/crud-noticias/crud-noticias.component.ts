import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Noticia } from '../models/noticia';
import { NoticiaService } from '../services/noticia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';
@Component({
  selector: 'app-crud-noticias',
  templateUrl: './crud-noticias.component.html',
  styleUrls: ['./crud-noticias.component.css']
})
export class CrudNoticiasComponent implements OnInit {
  listNoticias: Noticia[] = [];
  id: string | null;
  listRegistrado: Registrado[] = [];

  constructor(private toastr: ToastrService,private _noticiaService: NoticiaService,private router:Router,private _registradoService: RegistradoService,private aRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('correo');
    this.obtenerNoticias();
  }
  obtenerNoticias(){
    this._noticiaService.getNoticias().subscribe(data => {
      console.log(data);
      this.listNoticias = data;
    }, error =>{
      console.log(error);
    }
   )
  }

  eliminarNoticia(id: any){
    this._noticiaService.eliminarNoticias(id).subscribe(data => {
      this.toastr.error("El usuario fue eliminado con exito", "Usuario Eliminado")
      this.obtenerNoticias();
    },error =>{
      console.log(error);
    })
  }

  ruta(id:any){
      this.router.navigate(['/editar-noticia/' + id]);
  }

}
