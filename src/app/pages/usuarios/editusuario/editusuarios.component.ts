import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editusuarios',
  templateUrl: './editusuarios.component.html',
  styleUrls: ['./editusuarios.component.scss']
})

export class EditUsuariosComponent implements OnInit{
  usuario: Usuario =  new Usuario();
  datos: FormGroup;
  constructor(private service:UsuarioService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      idusuario: [this.usuario.idusuario = +localStorage.getItem("idusuario")],
      usuario: [this.usuario.usuario = localStorage.getItem("usuario"), Validators.required],
      correo: [this.usuario.correo = localStorage.getItem("correo"), Validators.required],
      nombres: [this.usuario.nombres = localStorage.getItem("nombres"), Validators.required],
      apellidos: [this.usuario.apellidos = localStorage.getItem("apellidos"), Validators.required],
			direccion: [this.usuario.direccion = localStorage.getItem("direccion"), Validators.required],
      ciudad: [this.usuario.ciudad = localStorage.getItem("ciudad"), Validators.required],
      municipio: [this.usuario.municipio = localStorage.getItem("municipio"), Validators.required],
      celular: [this.usuario.celular = localStorage.getItem("celular"), Validators.required],
      password: [this.usuario.password = localStorage.getItem("password"), Validators.required],
    });
  }

  ngOnInit(){
    this.Editar();
    console.log(this.usuario);
  }

  Cancelar(){
    this.router.navigate(["usuarios"]);
  }

  Editar(){
    this.usuario.idusuario = +localStorage.getItem("idusuario");
    /*(await this.service.getEmpresaId(+idempresa))
    .subscribe(data=>{
      this.empresa=data;
      console.log(this.empresa);
    });*/
  }

  Guardar(event:Event){
    if(this.datos.valid){
      this.service.updateUsuario(this.datos.value)
    .subscribe(data=>{
      this.toastr.success("Se ha actualizado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["usuarios"])
    })}
  }

}
