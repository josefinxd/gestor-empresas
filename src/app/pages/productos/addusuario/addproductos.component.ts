import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-addproductos',
  templateUrl: './addproductos.component.html',
  styleUrls: ['./addproductos.component.scss']
})
export class AddProductosComponent {
  datos: FormGroup;
  producto:Producto;
  constructor(private service:ProductoService, private router:Router, private builder:FormBuilder,private toastr: ToastrService) {
    this.createBuilder();
  }

  createBuilder(){
    this.datos = this.builder.group({
      producto: ['', Validators.required],
      correo: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
			direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      municipio: ['', Validators.required],
      celular: ['', Validators.required],
      password: ['', Validators.required],
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
      this.service.createProducto(this.datos.value)
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
