import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from '../models/horario';
import { HorarioService } from '../services/horario.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '../models/calendar';
import esLocales from '@fullcalendar/core/locales/es';
import { buildLocale } from '@fullcalendar/core/datelib/locale';

/* import esLocale from '@fullcalendar/core'; */

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  public  laboratorio: string | null;
  public  listHorario: Horario[] = [];
  public  prueba: string[] = [];
  public  listEvents: Calendar[] = [];
  eve: any[];
  public events: any[];
  public options: any;


  constructor(private aRouter: ActivatedRoute,public _horarioService: HorarioService,) { 
    this.laboratorio = this.aRouter.snapshot.paramMap.get('laboratorio');
  }

  ngOnInit(): void {

    this._horarioService.getHorarios().subscribe(
      (data) => {
        this.listHorario = data;
        for (let i = 0; i < this.listHorario.length; i++) {
          this.options = {
            plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin],
            defaultDate: new Date(),
            locale: esLocales,
            header:{
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
          };    
          const CALENDAR : Calendar = {
            title: this.listHorario[i].nombres + '\n - ' + this.listHorario[i].actividades,
            start: this.listHorario[i].fecha + 'T' + this.obtenerHoraInicio(this.listHorario[i].hora),
            end: this.listHorario[i].fecha + 'T' + this.obtenerHoraFin(this.listHorario[i].hora),
            description: this.listHorario[i].actividades,
            backgroundColor: 'rgb(0,122,217)'
          }
              
          this.listEvents.push(CALENDAR);
          
        }
   

      }
    );
  
/* 

    var hor = [];
    hor.push(this.obtenerHorarios());
    console.log(hor[0]);
 */
  }

  obtenerHorarios(){
    /* Obtención de datos BBDD */
    var vect = [];
    this._horarioService.getHorarios().subscribe(
      (data) => {
        vect.push(data[0].nombres);
      }
    );
    /*  */
    return vect;
  }

  
  getLaboratorio(){
    return this.laboratorio;
  }

  obtenerDia(dateString: string){
    var days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    return dayName
  }

  obtenerHoraInicio(hora:string){
    const split = (hora).split('-');
    const inicio = split[0].replace(/ /g, "");
    return inicio;
  }

  obtenerHoraFin(hora:string){
    const split = (hora).split('-');
    const fin = split[1].replace(/ /g, "");
    return fin;
  }



 /*  objetos_d(start:string){
   
    console.log(CALENDAR);
    this.listEvents.push(CALENDAR);
  } */

}
