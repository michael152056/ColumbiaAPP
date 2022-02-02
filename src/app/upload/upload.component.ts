import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadedFiles: Array <File> = [];
  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  onUpload(){
    let formData = new FormData();
    for (let i =0; i < this.uploadedFiles.length; i++){
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    //llamar al servicio
    this.uploadService.uploadFile(formData).subscribe((res)=> {
      console.log('REsponse:', res);
    });
  }

  onFileChange(e: any){
    this.uploadedFiles = e.target.files;
  }

}
