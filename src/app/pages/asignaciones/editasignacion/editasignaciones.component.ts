import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../../services/empresa.service'
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Asignacion } from 'src/app/models/Asignacion';
import { Usuario } from 'src/app/models/usuario';
import { AsignacionService } from 'src/app/services/asignaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-editasignaciones',
  templateUrl: './editasignaciones.component.html',
  styleUrls: ['./editasignaciones.component.scss']
})

export class EditAsignacionesComponent implements OnInit{
  datos: FormGroup;
  asignacion:Asignacion = new Asignacion();
  empresas:Empresa[];
  usuarios:Usuario[];
  constructor(private serviceEmpresa:EmpresaService, private serviceUsuario:UsuarioService,
    private serviceAsignacion:AsignacionService, private router:Router, private builder:FormBuilder,
    private toastr: ToastrService) {
      console.log("Constructor");
      this.createBuilder();
    this.serviceAsignacion.getAsignacionId(+localStorage.getItem("idasignacion"))
      .subscribe(data => {
        this.asignacion = data;
      })
      this.serviceEmpresa.getEmpresas()
    .subscribe(data=>{
      this.empresas=data;
    })
    this.serviceUsuario.getUsuarios()
    .subscribe(data=>{
      this.usuarios=data;
    })
  }

  createBuilder(){
    console.log("createBuilder");
    this.datos = this.builder.group({
      rol: [localStorage.getItem("rol"), Validators.required],
			usuario: [localStorage.getItem("idusuario"), Validators.required],
      empresa: [localStorage.getItem("idempresa"), Validators.required]
    });
    console.log(this.datos.value)
  }

  ngOnInit(){
    console.log("ngOnInit");
  }

  Cancelar(){
    this.router.navigate(["asignaciones"]);
  }


  Guardar(event:Event){
    console.log(this.datos.value)
    /*console.log(this.datos.valid);
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
      this.asignacion.rol = this.datos.value.rol;
      this.asignacion.idempresa = this.empresas.find(e => e.idempresa == this.datos.value.empresa);
      this.asignacion.idusuario = this.usuarios.find(u => u.idusuario == this.datos.value.usuario);
      console.log(this.asignacion);
      this.serviceAsignacion.createAsignacion(this.asignacion)
    .subscribe(data=>{
      this.toastr.success("Se ha guardado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["asignaciones"])
    })}*/
  }

}
