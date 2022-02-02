import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  url = 'http://localhost:4000/api/noticias/'
  constructor(private http: HttpClient) { }
  getNoticias(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerNoticia(id: string):Observable<any>{
    return this.http.get(this.url + id);
  }

  eliminarNoticias(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }
  guardarNoticia(noticia: Noticia):Observable<any>{
    return this.http.post(this.url,noticia);
  }

  editarNoticia(id:string,noticia: Noticia):Observable<any>{
      return this.http.put(this.url + id,noticia);
  }

}
