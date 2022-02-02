import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css']
})
export class DashboardClienteComponent implements OnInit {
  opciones = [
    { titulo : 'Ventas', info1: '180 realizadas hoy', info2: '21% mas que ayer', imagen: '../../assets/op1.png', color: '#4fc3f7' },
    { titulo : 'Transacciones', info1: '180 realizadas hoy', info2: '12 transacciones nuevas', imagen: '../../assets/op2.png', color: '#ce93d8' },
    { titulo : 'Inventario', info1: 'Total: 485 ítems', info2: '6 ítems nuevos', imagen: '../../assets/op3.png', color: '#fff176' },
    { titulo : 'Movimientos de caja', info1: '180 realizadas hoy', info2: '21% mas que ayer', imagen: '../../assets/op4.png', color: '#aed581' },
    { titulo : 'Añadir ítem', info1: '2 añadidos hoy', info2: 'añada nuevos productos', imagen: '../../assets/op5.png', color: '#80cbc4' },
    { titulo : 'Clientes', info1: 'Total: 389', info2: '41% mas que ayer', imagen: '../../assets/op6.png', color: '#ffab91' },
    { titulo : 'Reportes', info1: 'Total: 180', info2: '12% mas que ayer', imagen: '../../assets/op7.png', color: '#bdbdbd' },
    { titulo : 'Configuraciones', info1: 'Opciones extra', info2: 'Revisar', imagen: '../../assets/op8.png', color: '#f48fb1' }
  ];
  constructor() { }

  ngOnInit(): void {

  }

}
