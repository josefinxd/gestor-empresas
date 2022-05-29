import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../../services/empresa.service'
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Reunion } from 'src/app/models/Reunion';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-addreuniones',
  templateUrl: './addreuniones.component.html',
  styleUrls: ['./addreuniones.component.scss']
})
export class AddReunionesComponent {
  datos: FormGroup;
  reunion:Reunion = new Reunion();
  empresas:Empresa[];
  usuarios:Usuario[];
  time = {hour: 10, minute: 10};
  constructor(private serviceEmpresa:EmpresaService, private serviceUsuario:UsuarioService,
    private serviceReunion:ReunionService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.serviceEmpresa.getEmpresas()
    .subscribe(data=>{
      this.empresas=data;
    })
    this.serviceUsuario.getUsuarios()
    .subscribe(data=>{
      this.usuarios=data;
    })
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      rol: ['Usuario', Validators.required],
			usuario: ['', Validators.required],
      empresa: ['', Validators.required]
    });
  }

  Guardar(event:Event){
    console.log(this.datos.valid);
    if(this.datos.value.usuario === ''){
      this.toastr.error("Debe seleccionar un usuario!", "Error",{
        timeOut:3000
      })
    }
    if(this.datos.value.empresa === ''){
      this.toastr.error("Debe seleccionar una empresa!", "Error",{
        timeOut:3000
      })
    }
    console.log(this.datos.value);
    if(this.datos.valid){
      this.reunion.idusuario = this.usuarios.find(u => u.idusuario == this.datos.value.usuario);
      console.log(this.reunion);
      this.serviceReunion.createReunion(this.reunion)
    .subscribe(data=>{
      this.toastr.success("Se ha guardado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["reuniones"])
    })}

  }

  Cancelar(){
    this.router.navigate(["reuniones"]);
  }

}
