import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa';
import { NgxSpinnerService } from "ngx-spinner";
import { PrimeNGConfig } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [ConfirmationService]
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[];
  isLoading = false;
  constructor(private service:UsuarioService, private router:Router, private toastr:ToastrService,private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getUsuarios()
    .subscribe(data=>{
      this.usuarios=data;
      this.spinner.hide();
      this.primengConfig.ripple = true;
    })
  }
  Nuevo(){
    this.router.navigate(["addusuario"]);
  }

  Editar(usuarios:Usuario):void{
    localStorage.setItem("idusuario",usuarios.idusuario.toString());
    localStorage.setItem("usuario",usuarios.usuario.toString());
    localStorage.setItem("correo",usuarios.correo.toString());
    localStorage.setItem("nombres",usuarios.nombres.toString());
    localStorage.setItem("apellidos",usuarios.apellidos.toString());
    localStorage.setItem("direccion",usuarios.direccion.toString());
    localStorage.setItem("ciudad",usuarios.ciudad.toString());
    localStorage.setItem("municipio",usuarios.municipio.toString());
    localStorage.setItem("celular",usuarios.celular.toString());
    localStorage.setItem("password",usuarios.password.toString());
    this.router.navigate(["editusuario"]);
  }

  Eliminar(usuario:Usuario){
    console.log("Entro a eliminar");
    this.confirmationService.confirm({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accept")
        this.service.deleteUsuario(usuario)
        .subscribe(data=>{
          this.usuarios = this.usuarios.filter(e=>e!==usuario);
          this.toastr.success("Se ha eliminado el registro!", "Exitoso",{
            timeOut:3000
            })
          });
          this.router.navigate(["usuarios"]);
      },
      reject: () => {
        this.toastr.warning("Cancelo la acción", "Advertencia",{
          timeOut:3000
        })
      }
  });
  }

}
