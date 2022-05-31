import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Orden } from 'src/app/models/Orden';
import { OrdenService } from '../../services/orden.service'
import { NgxSpinnerService } from "ngx-spinner";
import { PrimeNGConfig } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss'],
  providers: [ConfirmationService]
})
export class OrdenesComponent implements OnInit {

  ordenes:Orden[];
  isLoading = false;
  constructor(private service:OrdenService, private router:Router, private toastr:ToastrService,private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getOrdenes()
    .subscribe(data=>{
      this.ordenes=data;
      this.spinner.hide();
      this.primengConfig.ripple = true;
      console.log(this.ordenes);
    })
  }
  Nuevo(){
    this.router.navigate(["addorden"]);
  }

  Editar(orden:Orden):void{
    localStorage.setItem("idorden",orden.idorden.toString());
    this.router.navigate(["editorden"]);
  }

  Eliminar(orden:Orden){
    console.log("Entro a eliminar");
    this.confirmationService.confirm({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accept")
        this.service.deleteOrden(orden)
        .subscribe(data=>{
          this.ordenes = this.ordenes.filter(e=>e!==orden);
          this.toastr.success("Se ha eliminado el registro!", "Exitoso",{
            timeOut:3000
            })
          });
          this.router.navigate(["ordenes"]);
      },
      reject: () => {
        this.toastr.warning("Cancelo la acción", "Advertencia",{
          timeOut:3000
        })
      }
  });
  }

}
