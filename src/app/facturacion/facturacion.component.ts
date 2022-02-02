import { Component, OnInit } from '@angular/core';
import { Registrado } from '../models/registrado';
import { RegistradoService } from '../services/registrado.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../models/carrito';
import { TransaccionService } from '../services/transaccion.service';
import { Transaccion } from '../models/transaccion';



@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  listCarrito: Carrito[] = [];
  listRegistrados: Registrado[] = [];
  id: string | null;
  public total = 0;
  registradoForm: FormGroup;
  public subtotal = 0;  
  private value; 


  constructor(private _transaccionService: TransaccionService, private fb: FormBuilder,private toastr: ToastrService,private _registradoService: RegistradoService,private aRouter: ActivatedRoute,private router:Router,private _carritoService: CarritoService) {
    this.registradoForm = this.fb.group({
      nombres: [''],
      correo: [''],
      celular: [''],
      ubicacion: [''],
      cedula: [''],
      total: [''],
      subtotal: [''],
      iva: ['']

    })
   }

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

  findsum(data: any){    
    this.value=data;    
    console.log(this.value);  
    for(let j=0;j<data.length;j++){   
         this.total+= this.value[j].precio * this.value[j].cantidad
    } 
    return this.total;
  }
  
  obtenerRegistrados(){

    try {
      this._registradoService.getRegistradosCedula(this.registradoForm.get('cedula')?.value).subscribe(data => {
        this.listRegistrados = data;

        this.registradoForm.setValue({
          nombres: this.listRegistrados[0].nombres,
          correo: this.listRegistrados[0].correo,
          ubicacion: this.listRegistrados[0].ubicacion,
          celular: this.listRegistrados[0].celular,
          cedula: this.listRegistrados[0].cedula,
          subtotal: Number(this.total) - Number(this.total)*0.12,
          iva: Number(this.total)*0.12,
          total: this.total
        })

      }, error =>{
        console.log(error);
      }
     )
    } catch (error) {
      
    }
  }


 
  generatePDF(){
    var datos = 
    `-------Factura Electrónica-------

    Empresa: Restaurant Columbia
    RUC: 9999999999999
    Dirección: Av. Cristóbal Colón, Quito 170102
    Teléfono: (02) 255-1857
    Factura N°: ` + Math.random() * (999 - 0) + 0  + `
    Cliente: ` + this.registradoForm.get('nombres')?.value + `
    Cédula: ` + this.registradoForm.get('cedula')?.value + `
    Fecha: ` + this.getFecha() + `
    Correo: ` + this.registradoForm.get('correo')?.value + `
    Celular: ` + this.registradoForm.get('celular')?.value + `
    Ubicación: ` + this.registradoForm.get('ubicacion')?.value + `
    Cajero: ` + localStorage.getItem('nombre') + `
    -----------------------------------------------------------------------`;

    
    ;
    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt(datos).bold().italics().end
      
    );

    pdf.add(
      new Table([
        [ 'Nombre | ', 'Categoría | ', 'Cantidad |', 'Precio |', 'Precio Total']
    ]).bold().layout('noBorders').end
    );

    pdf.add(
      new Txt('-----------------------------------------------------------------------').bold().italics().end
      
    );
  
    for (let i = 0; i < this.listCarrito.length; i++) {
      pdf.add(
        new Table([
          [ this.listCarrito[i].nombre,this.listCarrito[i].categoria, this.listCarrito[i].cantidad, this.listCarrito[i].precio, this.listCarrito[i].precio * this.listCarrito[i].cantidad]
      ]).layout('noBorders').end
      );
    
      
    }

    pdf.add(
      new Table([
        [ 'Subtotal: ', (Number(this.total) - Number(this.total)*0.12)],
        [ 'IVA 12%: ', (Number(this.total)*0.12)],
        [ 'Total: ', this.total]
    ]).layout('noBorders').end
    );

    

    pdf.create().open();
  }

  agregarTransaccion(){
    var codigo = Math.random() * (999 - 0) + 0;
    const TRANSACCION: Transaccion = {
      fecha: this.getFecha2(),
      hora: this.getHora(),
      codigo: codigo.toString(),
      cliente: this.registradoForm.get('nombres')?.value,
      cajero: localStorage.getItem('nombre'),
      valor: this.total.toString()
    }
    console.log(TRANSACCION);
    this._transaccionService.guardarTransaccion(TRANSACCION).subscribe(data => {
      this.toastr.success('Transacción realizada con éxito!', 'Transacción registrada!');
      this.eliminarCarrito();
      this.enlace();
    }, error => {
      console.log(error);
      
    })

  }

  eliminarCarrito(){
    this._carritoService.eliminarCarritos().subscribe(data => {
      this.obtenerCarritos();
    },error =>{
      console.log(error);
    })
  }

  getFecha(){
    const MESES = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const f = new Date();
    var date = f.getDay() + ' '  + MESES[f.getMonth()] + ' ' + f.getFullYear() + ' | ' + f.getHours() + ':' +f.getMinutes() + ':' + f.getSeconds(); 
 return date.toString();
  }


  getFecha2(){
    const MESES = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const f = new Date();
    var date = f.getDay() + ' '  + MESES[f.getMonth()] + ' ' + f.getFullYear(); 
 return date.toString();
  }

  getHora(){
    const f = new Date();
    var date = f.getHours() + ':' +f.getMinutes() + ':' + f.getSeconds();
    return date.toString();
  }
  enlace(){
   
    this.router.navigate(['/ventas']);
}

}
