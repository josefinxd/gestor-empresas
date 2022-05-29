import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Reunion } from 'src/app/models/Reunion';
import { ReunionService } from '../../services/reunion.service'
import { NgxSpinnerService } from "ngx-spinner";
import { PrimeNGConfig } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.scss'],
  providers: [ConfirmationService]
})
export class ReunionesComponent implements OnInit {

  reuniones:Reunion[];
  isLoading = false;
  constructor(private service:ReunionService, private router:Router, private toastr:ToastrService,private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getReuniones()
    .subscribe(data=>{
      this.reuniones=data;
      this.spinner.hide();
      this.primengConfig.ripple = true;
      console.log(this.reuniones);
    })
  }
  Nuevo(){
    this.router.navigate(["addreunion"]);
  }

  Editar(reunion:Reunion):void{
    localStorage.setItem("idreunion",reunion.idreunion.toString());
    this.router.navigate(["editreunion"]);
  }

  Eliminar(reunion:Reunion){
    console.log("Entro a eliminar");
    this.confirmationService.confirm({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accept")
        this.service.deleteReunion(reunion)
        .subscribe(data=>{
          this.reuniones = this.reuniones.filter(e=>e!==reunion);
          this.toastr.success("Se ha eliminado el registro!", "Exitoso",{
            timeOut:3000
            })
          });
          this.router.navigate(["reuniones"]);
      },
      reject: () => {
        this.toastr.warning("Cancelo la acción", "Advertencia",{
          timeOut:3000
        })
      }
  });
  }

}
