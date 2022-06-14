import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/Producto';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-addproductos',
  templateUrl: './addproductos.component.html',
  styleUrls: ['./addproductos.component.scss']
})
export class AddProductosComponent {
  datos: FormGroup;
  producto:Producto = new Producto();
  empresas:Empresa[];
  constructor(private serviceEmpresa:EmpresaService,private service:ProductoService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.createBuilder();
    this.serviceEmpresa.getEmpresas()
    .subscribe(data=>{
      this.empresas=data;
    })
  }

  createBuilder(){
    this.datos = this.builder.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      empresa: ['', Validators.required],
    });
  }

  Guardar(event:Event){
    console.log(this.datos.valid);
    if(this.datos.value.nombre === ''){
      this.toastr.error("Debe ingresar un nombre!", "Error",{
        timeOut:3000
      })
    }
    if(this.datos.value.cantidad === ''){
      this.toastr.error("Debe ingresar una cantidad!", "Error",{
        timeOut:3000
      })
    }
    if(this.datos.value.precio === ''){
      this.toastr.error("Debe ingresar un precio!", "Error",{
        timeOut:3000
      })
    }else{
      if (this.datos.value.precio < 0) {
        this.toastr.error("Debe ingresar un precio valido!", "Error",{
          timeOut:3000
        })
      }
    }
    if(this.datos.value.empresa === ''){
      this.toastr.error("Debe seleccionar una empresa!", "Error",{
        timeOut:3000
      })
    }
    console.log(this.datos.value);
    if(this.datos.valid){
      this.producto.nombre = this.datos.value.nombre;
      this.producto.cantidad = this.datos.value.cantidad;
      this.producto.precio = this.datos.value.precio;
      this.producto.idempresa = this.empresas.find(e => e.idempresa == this.datos.value.empresa);
      console.log(this.producto)
      this.service.createProducto(this.producto)
    .subscribe(data=>{
      this.toastr.success("Se ha guardado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["productos"])
    })}

  }

  Cancelar(){
    this.router.navigate(["productos"]);
  }

}
