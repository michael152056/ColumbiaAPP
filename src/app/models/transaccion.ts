export class Transaccion{
    static forEach(arg0: (data: any) => void) {
      throw new Error('Method not implemented.');
    }
    _id?: number;
    fecha: string;
    hora: string;
    codigo: string;
    cliente: string;
    cajero: string;
    valor: string;

    constructor(fecha:string,hora: string, codigo: string, cliente: string,cajero: string,valor: string){
        this.fecha = fecha;
        this.hora = hora;
        this.codigo =  codigo;
        this.cliente = cliente;
        this.cajero = cajero;
        this.valor = valor;
    }
}