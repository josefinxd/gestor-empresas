import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../services/empresa.service'
import { NgxSpinnerService } from "ngx-spinner";
import { PrimeNGConfig } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
  providers: [ConfirmationService]
})
export class EmpresasComponent implements OnInit {

  empresas:Empresa[];
  isLoading = false;
  constructor(private service:EmpresaService, private router:Router, private toastr:ToastrService,private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getEmpresas()
    .subscribe(data=>{
      this.empresas=data;
      this.spinner.hide();
      this.primengConfig.ripple = true;
    })
  }
  Nuevo(){
    this.router.navigate(["addempresa"]);
  }

  Editar(empresa:Empresa):void{
    localStorage.setItem("idempresa",empresa.idempresa.toString());
    localStorage.setItem("nombre",empresa.nombre.toString());
    localStorage.setItem("direccion",empresa.direccion.toString());
    localStorage.setItem("tipo",empresa.tipo.toString());
    this.router.navigate(["editempresa"]);
  }

  Eliminar(empresa:Empresa){
    console.log("Entro a eliminar");
    this.confirmationService.confirm({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accept")
        this.service.deleteEmpresa(empresa)
        .subscribe(data=>{
          this.empresas = this.empresas.filter(e=>e!==empresa);
          this.toastr.success("Se ha eliminado el registro!", "Exitoso",{
            timeOut:3000
            })
          });
          this.router.navigate(["empresas"]);
      },
      reject: () => {
        this.toastr.warning("Cancelo la acción", "Advertencia",{
          timeOut:3000
        })
      }
  });
  }

}
