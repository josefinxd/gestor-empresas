import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-editproductos',
  templateUrl: './editproductos.component.html',
  styleUrls: ['./editproductos.component.scss']
})

export class EditProductosComponent implements OnInit{
  producto: Producto =  new Producto();
  datos: FormGroup;
  empresas:Empresa[];
  constructor(private service:ProductoService, private serviceEmpresa:EmpresaService,
     private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      empresa: ['', Validators.required],
    });
  }

  loadInfo(){
    this.service.getProductoId(+localStorage.getItem("idproducto"))
      .subscribe(data => {
        this.producto = data;
        this.datos.patchValue({
          nombre: this.producto.nombre,
          cantidad: this.producto.cantidad,
          precio: this.producto.precio,
          empresa: this.producto.idempresa.idempresa,
        })
      })
      this.serviceEmpresa.getEmpresas()
    .subscribe(data=>{
      this.empresas=data;
    })
  }

  ngOnInit(){
    this.Editar();
    this.loadInfo();
  }

  Cancelar(){
    this.router.navigate(["productos"]);
  }

  Editar(){
    this.producto.idproducto = +localStorage.getItem("idproducto");
    /*(await this.service.getEmpresaId(+idempresa))
    .subscribe(data=>{
      this.empresa=data;
      console.log(this.empresa);
    });*/
  }

  Guardar(event:Event){
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
    if(this.datos.valid){
      this.producto.nombre = this.datos.value.nombre;
      this.producto.cantidad = this.datos.value.cantidad;
      this.producto.precio = this.datos.value.precio;
      this.producto.idempresa = this.empresas.find(e => e.idempresa == this.datos.value.empresa);
      console.log(this.producto)
      this.service.updateProducto(this.producto)
    .subscribe(data=>{
      this.toastr.success("Se ha actualizado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["productos"])
    })}
  }

}
