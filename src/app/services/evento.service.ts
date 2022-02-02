import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  url = 'http://localhost:4000/api/eventos/'
  constructor(private http: HttpClient) { }

  getEventos(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerEvento(id: string):Observable<any>{
    return this.http.get(this.url + id);
  }
  eliminarEventos(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }
  guardarEvento(evento: Evento):Observable<any>{
    return this.http.post(this.url,evento);
  }

  editarEvento(id:string,evento: Evento):Observable<any>{
      return this.http.put(this.url + id,evento);
  }


}
