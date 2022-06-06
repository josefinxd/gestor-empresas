import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Chart from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Asignacion } from 'src/app/models/Asignacion';
import { Empresa } from 'src/app/models/empresa';
import { Orden } from 'src/app/models/orden';
import { AsignacionService } from 'src/app/services/asignaciones.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { OrdenService } from 'src/app/services/orden.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  ordenes: Orden[];
  lempresas: Empresa[];
  nordenes: Orden[];
  lordenes: Orden[];
  asignaciones: Asignacion[];
  auxasig: Asignacion[];
  public internas: String = '0';
  public compras: String = '0';
  public ventas: String = '0';
  public empresas: String = '0';
  datos: FormGroup;

  constructor(private service: OrdenService, private spinner: NgxSpinnerService, private serviceEmpresa: EmpresaService,
    private primengConfig: PrimeNGConfig, private builder: FormBuilder, private serviceAsignacion: AsignacionService) {
    this.serviceEmpresa.getEmpresas()
      .subscribe(data => {
        this.lempresas = data;
        console.log(this.lempresas);
      })
    this.serviceAsignacion.getAsignaciones()
      .subscribe(data => {
        this.asignaciones = data;
        console.log(this.asignaciones);
      })
    this.createBuilder();
  }

  createBuilder() {
    this.datos = this.builder.group({
      empresa: ['', {}]
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getOrdenes()
      .subscribe(data => {
        this.ordenes = data;
        console.log(this.ordenes);
        this.serviceEmpresa.getEmpresas()
          .subscribe(data => {
            this.empresas = "" + data.length;
            this.lempresas = data;
          })
        this.spinner.hide();
        this.primengConfig.ripple = true;
        this.internas = "" + this.ordenes.filter(function (value, index) { return value.tipo == "Interna"; }).length;
        this.compras = "" + this.ordenes.filter(function (value, index) { return value.tipo == "Compra"; }).length;
        this.ventas = "" + this.ordenes.filter(function (value, index) { return value.tipo == "Venta"; }).length;
      })

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
  }

  UpdateValue(event: Event) {
    console.log(this.asignaciones)
    console.log(this.datos.value);
    this.lordenes =[];
    this.auxasig = this.asignaciones.filter(a => a.idempresa.idempresa == this.datos.value.empresa);
    console.log(this.auxasig)
    this.nordenes= this.ordenes.filter(e => e.tipo == "Venta" );
    this.nordenes.forEach(n => {
      this.auxasig.forEach( a =>{
        if(a.idusuario.idusuario == n.idvendedor.idusuario){
          this.lordenes.push(n);
        }
      });
    });


    console.log(this.datos.value.empresa, this.lordenes);
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
