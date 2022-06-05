import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Chart from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Orden } from 'src/app/models/orden';
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
  ordenes:Orden[];
  public internas: String = '0';
  public compras: String = '0';
  public ventas: String = '0';
  public empresas: String = '0';

  constructor(private service:OrdenService, private spinner: NgxSpinnerService,private serviceEmpresa:EmpresaService,
    private primengConfig: PrimeNGConfig) { }


  ngOnInit() {
    this.spinner.show();
    this.service.getOrdenes()
    .subscribe(data=>{
      this.ordenes=data;
      this.serviceEmpresa.getEmpresas()
      .subscribe(data=>{
        this.empresas= ""+data.length;
      })
      this.spinner.hide();
      this.primengConfig.ripple = true;
      this.internas = ""+this.ordenes.filter(function(value,index){return value.tipo == "Interna";}).length;
      this.compras = ""+this.ordenes.filter(function(value,index){return value.tipo == "Compra";}).length;
      this.ventas = ""+this.ordenes.filter(function(value,index){return value.tipo == "Venta";}).length;
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


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
