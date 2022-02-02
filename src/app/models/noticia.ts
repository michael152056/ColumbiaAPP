export class Noticia{
    static forEach(arg0: (data: any) => void) {
      throw new Error('Method not implemented.');
    }
    _id?: number;
    titulo_noticia: string;
    desc_noticia: string;
    foto_noticia: string;
    tipo_usuario: string;


    constructor(titulo_noticia:string,desc_noticia: string, foto_noticia: string, tipo_usuario: string){
        this.titulo_noticia = titulo_noticia;
        this.desc_noticia = desc_noticia;
        this.foto_noticia =  foto_noticia;
        this.tipo_usuario = tipo_usuario;
    }
}