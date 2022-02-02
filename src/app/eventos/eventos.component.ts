import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  listEventos: Evento[] = [];
  campaignOne: FormGroup;
  campaignTwo: FormGroup;

/*   dataSource = new MatTableDataSource(this.listEventos); */
/*   @ViewChild(MatPaginator) paginator: MatPaginator; */
  constructor(private _eventoService: EventoService) { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });
  }
  filterPost = '';
  isShown: boolean;
  ngOnInit(): void {
    this.obtenerEventos();
    this.isShown = true;
/*     this.dataSource.paginator = this.paginator; */
  }

  obtenerEventos(){
    this._eventoService.getEventos().subscribe(data => {
      console.log(data);
      this.listEventos = data;
    }, error =>{
      console.log(error);
    }
   )
  }

  valorTotal(){
    return this.listEventos.length
  }

  toggleShow() {
    this.isShown = ! this.isShown;
  }

  onSearch() {
    console.log(this.campaignOne.controls['start'].value);
 }

  

}