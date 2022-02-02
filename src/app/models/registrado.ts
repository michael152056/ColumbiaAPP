export class Registrado{
    static forEach(arg0: (data: any) => void) {
      throw new Error('Method not implemented.');
    }
    _id?: number;
    nombres: string;
    correo: string;
    clave: string;
    ubicacion: string;
    celular: string;
    tipo: string;
    cedula: string;

    constructor(nombres:string, correo: string, clave: string, ubicacion: string,celular: string,tipo: string,cedula: string){
      this.nombres =  nombres;
      this.correo = correo;
        this.clave =  clave;
        this.ubicacion = ubicacion;
        this.celular = celular;
        this.tipo = tipo;
        this.cedula = cedula;
    }
}