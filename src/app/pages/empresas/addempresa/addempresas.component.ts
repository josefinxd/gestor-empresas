import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../../services/empresa.service'
import { FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-addempresas',
  templateUrl: './addempresas.component.html',
  styleUrls: ['./addempresas.component.scss']
})
export class AddEmpresasComponent {
  datos: FormGroup;
  empresa:Empresa;
  constructor(private service:EmpresaService, private router:Router, private builder:FormBuilder) {
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      nombre: ['', Validators.required],
			direccion: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  Guardar(event:Event){
    console.log(this.datos.valid);
    console.log(this.datos.value);
    if(this.datos.valid){
      this.service.createEmpresa(this.datos.value)
    .subscribe(data=>{
      alert("Se Agrego con Exito!");
      this.router.navigate(["empresas"])
    })}

  }

  Cancelar(){
    this.router.navigate(["empresas"]);
  }

}
