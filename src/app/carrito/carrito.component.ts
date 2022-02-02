import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../models/carrito';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  listCarrito: Carrito[] = [];
  public total=0;  
  public subtotal = 0;  
  private value; 
  constructor(private router:Router, 
    private toastr: ToastrService,private aRouter: ActivatedRoute, private _carritoService: CarritoService) { }

  ngOnInit(): void {
    this.obtenerCarritos();
  }
  obtenerCarritos(){
    this._carritoService.getCarritos().subscribe(data => {
      this.listCarrito = data;
      this.findsum(this.listCarrito);  
    }, error =>{
      console.log(error);
    }
   )
  }


  eliminarCarrito(){
    this._carritoService.eliminarCarritos().subscribe(data => {
      this.toastr.error("El carrito ha sido limpiado con éxito", "Carrito Vacío")
      this.obtenerCarritos();
    },error =>{
      console.log(error);
    })
  }

  eliminarCarritoOne(id :number){
    this._carritoService.eliminarCarritosOne(id).subscribe(data => {
      this.toastr.error("El item ha sido eliminado con éxito", "Item eliminadoyy")
      window.location.reload();
    },error =>{
      console.log(error);
    })
  }

  findsum(data: any){    
    this.value=data;    
    console.log(this.value);  
    for(let j=0;j<data.length;j++){   
         this.total+= this.value[j].precio * this.value[j].cantidad
    } 
    return this.total;
  }

}
