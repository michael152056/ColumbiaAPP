import { Component, OnInit } from '@angular/core';
import { Noticia } from '../models/noticia';
import { NoticiaService } from '../services/noticia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listNoticias: Noticia[] = [];

  constructor(private _noticiaService: NoticiaService) { }


  ngOnInit(): void {
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


}
