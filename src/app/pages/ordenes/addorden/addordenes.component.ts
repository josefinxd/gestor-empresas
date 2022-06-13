import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Orden } from 'src/app/models/Orden';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-addordenes',
  templateUrl: './addordenes.component.html',
  styleUrls: ['./addordenes.component.scss']
})
export class AddOrdenesComponent {
  datos: FormGroup;
  orden:Orden = new Orden();
  usuarios:Usuario[];
  time = {hour: 10, minute: 10};
  constructor(private serviceUsuario:UsuarioService,
    private serviceOrden:OrdenService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.serviceUsuario.getUsuarios()
    .subscribe(data=>{
      this.usuarios=data;
    })
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      tipo: ['Interna', Validators.required],
			usuario: ['', Validators.required],
      cliente: ['', Validators.required]
    });
  }

  Guardar(event:Event){
    console.log(this.datos.valid);
    if(this.datos.value.usuario === ''){
      this.toastr.error("Debe seleccionar un usuario!", "Error",{
        timeOut:3000
      })
    }
    if(this.datos.value.cliente === ''){
      this.toastr.error("Debe seleccionar una cliente!", "Error",{
        timeOut:3000
      })
    }
    console.log(this.datos.value);
    if(this.datos.valid){
      this.orden.tipo = this.datos.value.tipo;
      this.orden.fecha = new Date();
      this.orden.idvendedor = this.usuarios.find(u => u.idusuario == this.datos.value.usuario);
      this.orden.idcomprador = this.usuarios.find(u => u.idusuario == this.datos.value.cliente);
      this.orden.total = 0.00;
      console.log(this.orden);
      this.serviceOrden.createOrden(this.orden)
    .subscribe(data=>{
      this.toastr.success("Se ha guardado el registro!", "Exitoso",{
        timeOut:3000
      })
      console.log("Orden almacenada: ", data);
      localStorage.setItem("idorden",data.idorden.toString());
      this.router.navigate(["detalles"]);
    })}

  }

  Cancelar(){
    this.router.navigate(["ordenes"]);
  }

}
