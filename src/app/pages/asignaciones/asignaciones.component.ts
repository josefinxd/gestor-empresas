import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Asignacion } from 'src/app/models/Asignacion';
import { AsignacionService } from '../../services/asignaciones.service'
import { NgxSpinnerService } from "ngx-spinner";
import { PrimeNGConfig } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss'],
  providers: [ConfirmationService]
})
export class AsignacionesComponent implements OnInit {

  asignaciones:Asignacion[];
  isLoading = false;
  constructor(private service:AsignacionService, private router:Router, private toastr:ToastrService,private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getAsignaciones()
    .subscribe(data=>{
      this.asignaciones=data;
      this.spinner.hide();
      this.primengConfig.ripple = true;
      console.log(this.asignaciones);
    })
  }
  Nuevo(){
    this.router.navigate(["addasignacion"]);
  }

  Editar(asignacion:Asignacion):void{
    localStorage.setItem("idasignacion",asignacion.idasignacion.toString());
    localStorage.setItem("rol",asignacion.rol.toString());
    localStorage.setItem("idempresa",asignacion.idempresa.nombre.toString());
    localStorage.setItem("idusuario",asignacion.idusuario.usuario.toString());
    this.router.navigate(["editasignacion"]);
  }

  Eliminar(asignacion:Asignacion){
    console.log("Entro a eliminar");
    this.confirmationService.confirm({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accept")
        this.service.deleteAsignacion(asignacion)
        .subscribe(data=>{
          this.asignaciones = this.asignaciones.filter(e=>e!==asignacion);
          this.toastr.success("Se ha eliminado el registro!", "Exitoso",{
            timeOut:3000
            })
          });
          this.router.navigate(["asignaciones"]);
      },
      reject: () => {
        this.toastr.warning("Cancelo la acción", "Advertencia",{
          timeOut:3000
        })
      }
  });
  }

}
