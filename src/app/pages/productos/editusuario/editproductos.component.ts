import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-editproductos',
  templateUrl: './editproductos.component.html',
  styleUrls: ['./editproductos.component.scss']
})

export class EditProductosComponent implements OnInit{
  producto: Producto =  new Producto();
  datos: FormGroup;
  constructor(private service:ProductoService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      idproducto: [this.producto.idproducto = +localStorage.getItem("idproducto")],
    });
  }

  ngOnInit(){
    this.Editar();
    console.log(this.producto);
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
    if(this.datos.valid){
      this.service.updateProducto(this.datos.value)
    .subscribe(data=>{
      this.toastr.success("Se ha actualizado el registro!", "Exitoso",{
        timeOut:3000
      })
      this.router.navigate(["productos"])
    })}
  }

}
