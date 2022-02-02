import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  static getHorarios() {
      throw new Error('Method not implemented.');
  }
  url = 'http://localhost:4000/api/horarios/'
  constructor(public http: HttpClient) { }
  getHorarios(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerHorario(id: string):Observable<any>{
    return this.http.get(this.url + id);
  }

  eliminarHorarios(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }
  guardarHorario(horario: Horario):Observable<any>{
    return this.http.post(this.url,horario);
  }

  editarHorario(id:string,horario: Horario):Observable<any>{
      return this.http.put(this.url + id,horario);
  }

}
