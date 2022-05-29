import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { PrimeNGConfig } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [ConfirmationService]
})
export class ProductosComponent implements OnInit {

  productos:Producto[];
  isLoading = false;
  constructor(private service:ProductoService, private router:Router, private toastr:ToastrService,private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getProductos()
    .subscribe(data=>{
      this.productos=data;
      this.spinner.hide();
      this.primengConfig.ripple = true;
    })
  }
  Nuevo(){
    this.router.navigate(["addproducto"]);
  }

  Editar(productos:Producto):void{
    localStorage.setItem("idproducto",productos.idproducto.toString());
    this.router.navigate(["editproducto"]);
  }

  Eliminar(producto:Producto){
    console.log("Entro a eliminar");
    this.confirmationService.confirm({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accept")
        this.service.deleteProducto(producto)
        .subscribe(data=>{
          this.productos = this.productos.filter(e=>e!==producto);
          this.toastr.success("Se ha eliminado el registro!", "Exitoso",{
            timeOut:3000
            })
          });
          this.router.navigate(["productos"]);
      },
      reject: () => {
        this.toastr.warning("Cancelo la acción", "Advertencia",{
          timeOut:3000
        })
      }
  });
  }

}
