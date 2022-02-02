import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: any){
    let urlApi = 'http://localhost:4000/api/subir';
    return this.http.post(urlApi, formData);
  }
}

