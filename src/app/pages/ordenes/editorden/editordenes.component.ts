import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../../services/empresa.service'
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Orden } from 'src/app/models/Orden';
import { Usuario } from 'src/app/models/usuario';
import { OrdenService } from 'src/app/services/orden.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-editordenes',
  templateUrl: './editordenes.component.html',
  styleUrls: ['./editordenes.component.scss']
})

export class EditOrdenesComponent implements OnInit{
  datos: FormGroup;
  orden:Orden = new Orden();
  empresas:Empresa[];
  usuarios:Usuario[];
  constructor(private serviceEmpresa:EmpresaService, private serviceUsuario:UsuarioService,
    private serviceOrden:OrdenService, private router:Router, private builder:FormBuilder,
    private toastr: ToastrService) {
    this.createBuilder();
  }

  loadInfo(){
    this.serviceOrden.getOrdenId(+localStorage.getItem("idorden"))
      .subscribe(data => {
        this.orden = data;
        this.datos.patchValue({
          usuario: this.orden.idorden
        })
        console.log('orden',this.orden)
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
    this.router.navigate(["ordenes"]);
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
      this.orden.idcomprador = this.usuarios.find(u => u.idusuario == this.datos.value.usuario);
      console.log(this.orden);
      this.serviceOrden.createOrden(this.orden)
    .subscribe(data=>{
      this.toastr.success("Se ha actualizado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["ordenes"])
    })}
  }

}
