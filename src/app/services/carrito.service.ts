import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { Carrito } from '../models/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  url = 'http://localhost:4000/api/carritos/'
  constructor(private http: HttpClient) { }

  getCarritos(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarCarritos(): Observable<any>{
    return this.http.delete(this.url);
  }

  eliminarCarritosOne(id: number): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarCarrito(carrito: Carrito):Observable<any>{
    return this.http.post(this.url,carrito);
  }

  obtenerCarrito(id: string):Observable<any>{
    return this.http.get(this.url + id);
  }

  editarCarrito(id:string,carrito: Carrito):Observable<any>{
      return this.http.put(this.url + id,carrito);
  }

}
