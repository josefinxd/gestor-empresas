import { formatDate } from '@angular/common';
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
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  lempresas2: Empresa[];
  nordenes: Orden[];
  vordenes: Orden[];
  lordenes: Orden[];
  lordenes2: Orden[];
  asignaciones: Asignacion[];
  auxasig: Asignacion[];
  public internas: String = '0';
  public compras: String = '0';
  public ventas: String = '0';
  public empresas: String = '0';
  datos: FormGroup;
  datosV: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  dataV: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private service: OrdenService, private spinner: NgxSpinnerService, private serviceEmpresa: EmpresaService,
    private primengConfig: PrimeNGConfig, private builder: FormBuilder, private serviceAsignacion: AsignacionService) {
    this.serviceEmpresa.getEmpresas()
      .subscribe(data => {
        this.lempresas = data;
        this.lempresas2 = data;
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
      empresa: ['', {}],
      empresa2: ['', {}]
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
        this.vordenes = this.ordenes.filter(function (value, index) { return value.tipo == "Venta"; });
        for (let index = 0; index < 12; index++) {
          this.vordenes.forEach(element => {
            console.log('datosv', element);
            if (+formatDate(element.fecha, 'MM', 'en-US') - 1 == index) {
              this.datosV[index] = this.datosV[index] + element.total;
              this.dataV[index] = this.dataV[index] +1;
            }
          });
        }
        console.log(this.datosV);
        parseOptions(Chart, chartOptions());
        var chartSales = document.getElementById('chart-sales');
        this.salesChart = new Chart(chartSales, {
          type: 'line',
          options: chartExample1.options,
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Ventas',
              data: this.datosV
            }]
          }
        });
        var chartOrders = document.getElementById('chart-orders');
        var ordersChart = new Chart(chartOrders, {
          type: 'bar',
          options: chartExample2.options,
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Ventas',
              data: this.dataV,
              maxBarThickness: 10
            }]
          },
        });
      })
  }

  UpdateValue(event: Event) {
    console.log(this.asignaciones)
    console.log(this.datos.value);
    this.lordenes = [];
    this.auxasig = this.asignaciones.filter(a => a.idempresa.idempresa == this.datos.value.empresa);
    console.log(this.auxasig)
    this.nordenes = [];
    this.nordenes = this.ordenes.filter(e => e.tipo == "Venta");
    this.nordenes.forEach(n => {
      this.auxasig.forEach(a => {
        if (a.idusuario.idusuario == n.idvendedor.idusuario) {
          this.lordenes.push(n);
        }
      });
    });
    console.log(this.datos.value.empresa, this.lordenes);
  }

  UpdateValue2(event: Event) {
    console.log(this.asignaciones)
    console.log(this.datos.value);
    this.lordenes2 = [];
    this.auxasig = this.asignaciones.filter(a => a.idempresa.idempresa == this.datos.value.empresa2);
    console.log(this.auxasig)
    this.nordenes = [];
    this.nordenes = this.ordenes.filter(e => e.tipo == "Compra");
    this.nordenes.forEach(n => {
      this.auxasig.forEach(a => {
        if (a.idusuario.idusuario == n.idcomprador.idusuario) {
          this.lordenes2.push(n);
        }
      });
    });
    console.log(this.datos.value.empresa2, this.lordenes2);
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  public openVentasPDF(): void {
    let DATA: any = document.getElementById('htmlVentas');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Ventas-'+ this.lempresas.find(e => e.idempresa == this.datos.value.empresa).nombre +'.pdf');
    });
  }

  public openComprasPDF(): void {
    let DATA: any = document.getElementById('htmlCompras');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Ventas-'+ this.lempresas2.find(e => e.idempresa == this.datos.value.empresa2).nombre +'.pdf');
    });
  }

}
