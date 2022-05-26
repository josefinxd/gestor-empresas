import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-addusuarios',
  templateUrl: './addusuarios.component.html',
  styleUrls: ['./addusuarios.component.scss']
})
export class AddUsuariosComponent {
  datos: FormGroup;
  usuario:Usuario;
  constructor(private service:UsuarioService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      usuario: ['', Validators.required],
      correo: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
			direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      municipio: ['', Validators.required],
      celular: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Guardar(event:Event){
    console.log(this.datos.valid);
    if(!this.datos.valid){
      this.toastr.error("Debe llenar los campos solicitados!", "Error",{
        timeOut:3000
      })
    }
    console.log(this.datos.value);
    if(this.datos.valid){
      this.service.createUsuario(this.datos.value)
    .subscribe(data=>{
      this.toastr.success("Se ha guardado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["usuarios"])
    })}

  }

  Cancelar(){
    this.router.navigate(["usuarios"]);
  }

}
