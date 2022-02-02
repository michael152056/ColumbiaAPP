export class Producto{
    _id?: number;
    nombre: string;
    imagen: string;
    categoria: string;
    precio: number;
    estado: string;
    cantidad: number;

    constructor(nombre:string,imagen:string,categoria: string,precio: number, estado: string,cantidad: number){
        this.nombre = nombre;
        this.imagen = imagen;
        this.categoria = categoria;
        this.precio = precio;
        this.estado = estado;
        this.cantidad = cantidad;
    }
}