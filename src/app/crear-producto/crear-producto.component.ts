import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  listRegistrado: Registrado[] = [];
  titulo = 'Crear producto';
  id: string | null;
  constructor(private fb: FormBuilder,private _registradoService: RegistradoService, private router:Router, private toastr: ToastrService,private _productoService: ProductoService,private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      nombre: ['',Validators.required],
      imagen: ['',Validators.required],
      categoria: ['',Validators.required],
      precio: ['',Validators.required],
      estado: ['',Validators.required],
      cantidad:  ['',Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
}
   agregarProducto(){
      const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      imagen: this.productoForm.get('imagen')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      precio: this.productoForm.get('precio')?.value,
      estado: this.productoForm.get('estado')?.value,
      cantidad: this.productoForm.get('cantidad')?.value
    }
    if(this.id !==null){
      
      //editamos producto
      this._productoService.editarProducto(this.id,PRODUCTO).subscribe(data => {
        this.toastr.info('Producto actualizado con éxito!', 'Producto actualizado!');
        
        this.enlace2();
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
  
    }else{
      //agregamos
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('Producto registrado con éxito!', 'Producto registrado!');
        this.enlace();
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
  
    }
  }
 
  esEditar(){
    if(this.id !=null){
      this.titulo = 'Editar producto';

      this._productoService.obtenerProducto(this.id).subscribe(data =>{
          this.productoForm.setValue({
          nombre: data.nombre,
          imagen: data.imagen,
          categoria: data.categoria,
          precio: data.precio,
          estado: data.estado,
          cantidad: data.cantidad
        })
      }) 
    }
  }

  enlace2(){
   
    this.router.navigate(['/inventario']);
}


  enlace(){
   
      this.router.navigate(['/ventas']);
  }

  

}
