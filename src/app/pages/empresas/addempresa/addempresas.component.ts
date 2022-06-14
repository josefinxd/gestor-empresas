import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from '../../../services/empresa.service'
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addempresas',
  templateUrl: './addempresas.component.html',
  styleUrls: ['./addempresas.component.scss']
})
export class AddEmpresasComponent {
  datos: FormGroup;
  empresa:Empresa;
  constructor(private service:EmpresaService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      nombre: ['', Validators.required],
			direccion: ['', Validators.required],
      tipo: ['Interna', Validators.required]
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
      this.service.createEmpresa(this.datos.value)
    .subscribe(data=>{
      this.toastr.success("Se ha guardado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["empresas"])
    })}

  }

  Cancelar(){
    this.router.navigate(["empresas"]);
  }

}
