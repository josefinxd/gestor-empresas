import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from '../../../services/empresa.service'
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editempresas',
  templateUrl: './editempresas.component.html',
  styleUrls: ['./editempresas.component.scss']
})

export class EditEmpresasComponent implements OnInit{
  empresa: Empresa =  new Empresa();
  datos: FormGroup;
  constructor(private service:EmpresaService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      nombre: [this.empresa.nombre = localStorage.getItem("nombre"), Validators.required],
			direccion: [this.empresa.direccion = localStorage.getItem("direccion"), Validators.required],
      tipo: [this.empresa.tipo = localStorage.getItem("tipo"), Validators.required]
    });
  }

  ngOnInit(){
    this.Editar();
    console.log(this.empresa);
  }

  Cancelar(){
    this.router.navigate(["empresas"]);
  }

  Editar(){
    this.empresa.idempresa = +localStorage.getItem("idempresa");
    /*(await this.service.getEmpresaId(+idempresa))
    .subscribe(data=>{
      this.empresa=data;
      console.log(this.empresa);
    });*/
  }

  Guardar(event:Event){
    if(this.datos.valid){
      this.empresa.nombre = this.datos.value.nombre;
      this.empresa.direccion = this.datos.value.direccion;
      this.empresa.tipo = this.datos.value.tipo;
      this.service.updateEmpresa(this.empresa)
    .subscribe(data=>{
      this.toastr.success("Se ha actualizado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["empresas"])
    })}
  }

}
