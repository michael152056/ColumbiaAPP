export class Evento{
    static forEach(arg0: (data: any) => void) {
      throw new Error('Method not implemented.');
    }
    _id?: number;
    titulo_evento: string;
    tipo_evento: string;
    desc_evento: string;
    dia_evento: string;
    mes_evento: string;
    ano_evento: string;
    imagen_evento: string;

    constructor(titulo:string,tipo: string, desc: string, dia: string,mes: string,ano: string, imagen: string){
        this.titulo_evento = titulo;
        this.tipo_evento = tipo;
        this.desc_evento =  desc;
        this.dia_evento = dia;
        this.mes_evento = mes;
        this.ano_evento = ano;
        this.imagen_evento = imagen;
        
    }
}