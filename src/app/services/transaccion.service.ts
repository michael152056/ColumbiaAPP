import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  url = 'http://localhost:4000/api/transacciones/'
  constructor(private http: HttpClient) { }

  getTransaccions(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerTransaccion(id: string):Observable<any>{
    return this.http.get(this.url + id);
  }
  eliminarTransaccions(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }
  guardarTransaccion(transaccion: Transaccion):Observable<any>{
    return this.http.post(this.url,transaccion);
  }

  editarTransaccion(id:string,transaccion: Transaccion):Observable<any>{
      return this.http.put(this.url + id,transaccion);
  }


}
