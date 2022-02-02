import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Registrado } from '../models/registrado';


@Injectable({
  providedIn: 'root'
})
export class RegistradoService {
  url = 'http://localhost:4000/api/registrados/'
  constructor(private http: HttpClient) { }
  getRegistrados(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerRegistrado(correo: string):Observable<any>{
    return this.http.get(this.url + correo);
  }
  obtenerRegistradoOne(correo2:string):Observable<any>{
    return this.http.get(this.url + correo2);
  }

  getRegistradosCedula(ci:string):Observable<any>{
    return this.http.get(this.url +'ventas/' + ci);
  }



  eliminarRegistrados(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }
  guardarRegistrado(registrado: Registrado):Observable<any>{
    return this.http.post(this.url,registrado);
  }

  editarRegistrado(correo:string,registrado: Registrado):Observable<any>{
      return this.http.put(this.url + '/' + correo,registrado);
  }

}
