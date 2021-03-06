import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl,FormBuilder} from '@angular/forms';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../models/carrito';



@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  listCarrito: Carrito[] = [];
  productoForm: FormGroup;
  id: string | null;
  constructor(private fb: FormBuilder,private _productoService: ProductoService,private router:Router, 
   private toastr: ToastrService,private aRouter: ActivatedRoute, private _carritoService: CarritoService) { 

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.productoForm = this.fb.group({
      cantidad_producto:  [1]
    })

    this.id = this.aRouter.snapshot.paramMap.get('id');
   }
   filterPost = '';
   campaignOne: FormGroup;
   isShown: boolean;
  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCarritos();
    this.isShown = true;

    this._productoService.getProductos().subscribe(data =>{
      
  }) 

  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error =>{
      console.log(error);
    }
   )
  }

  obtenerCarritos(){
    this._carritoService.getCarritos().subscribe(data => {
      console.log(data);
      this.listCarrito = data;
    }, error =>{
      console.log(error);
    }
   )
  }


  eliminarCarrito(){
    this._carritoService.eliminarCarritos().subscribe(data => {
      this.toastr.error("El carrito ha sido limpiado con ??xito", "Carrito Vac??o");
      window.location.reload();
    },error =>{
      console.log(error);
    })
  }


  agregarCarrito(id : string){

    this._productoService.obtenerProducto(id).subscribe(data =>{
      const CARRITO: Carrito = {
        nombre: data.nombre,
        imagen: data.imagen,
        categoria: data.categoria,
        precio: data.precio,
        estado: data.estado,
        cantidad: this.productoForm.get('cantidad_producto')?.value
      }
       //agregamos
    console.log(CARRITO);
    this._carritoService.guardarCarrito(CARRITO).subscribe(data => {
      this.toastr.success('Producto a??adido con ??xito!', 'Item registrado!');
      window.location.reload();
    }, error => {
      console.log(error);
    })

    })



   

   

  
}

 
  
  ruta(id:any){
    this.router.navigate(['/editar-evento/' + id]);
}

toggleShow() {
  this.isShown = ! this.isShown;
}

onSearch() {
  console.log(this.campaignOne.controls['start'].value);
}


}
