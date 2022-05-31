import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../../services/empresa.service'
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Reunion } from 'src/app/models/Reunion';
import { Usuario } from 'src/app/models/usuario';
import { ReunionService } from 'src/app/services/reunion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-editreuniones',
  templateUrl: './editreuniones.component.html',
  styleUrls: ['./editreuniones.component.scss']
})

export class EditReunionesComponent implements OnInit{
  datos: FormGroup;
  reunion:Reunion = new Reunion();
  empresas:Empresa[];
  usuarios:Usuario[];
  constructor(private serviceEmpresa:EmpresaService, private serviceUsuario:UsuarioService,
    private serviceReunion:ReunionService, private router:Router, private builder:FormBuilder,
    private toastr: ToastrService) {
    this.createBuilder();
  }

  loadInfo(){
    this.serviceReunion.getReunionId(+localStorage.getItem("idreunion"))
      .subscribe(data => {
        this.reunion = data;
        this.datos.patchValue({
          usuario: this.reunion.idusuario.idusuario
        })
        console.log('reunion',this.reunion)
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
      rol: ['', Validators.required],
			usuario: ['', Validators.required],
      empresa: ['', Validators.required]
    });
    console.log(this.datos.value)
  }

  ngOnInit(){
    this.loadInfo();
  }

  Cancelar(){
    this.router.navigate(["reuniones"]);
  }


  Guardar(event:Event){
    console.log(this.datos.value)
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
      this.toastr.success("Se ha actualizado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["reuniones"])
    })}
  }

}
