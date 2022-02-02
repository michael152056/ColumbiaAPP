export class Horario{
    static forEach(arg0: (data: any) => void) {
      throw new Error('Method not implemented.');
    }
    _id?: number;
    correo: string;
    nombres: string;
    laboratorio: string;
    cargo: string;
    carrera: string;
    nivel: string;
    materia: string;
    cantidad_estudiantes: string;
    fecha: string;
    hora: string;
    actividades: string;

    constructor(correo:string,nombres: string, laboratorio: string,cargo: string,carrera: string,nivel: string, materia: string, cantidad_estudiantes: string, fecha: string, hora: string, actividades: string){
        this.correo = correo;
        this.nombres = nombres;
        this.laboratorio =  laboratorio;
        this.cargo = cargo;
        this.carrera = carrera;
        this.nivel = nivel;
        this.materia = materia;
        this.cantidad_estudiantes = cantidad_estudiantes;
        this.fecha = fecha;
        this.hora = hora;
        this.actividades = actividades;
    }
}