import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Detalle } from 'src/app/models/Detalle';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { OrdenService } from 'src/app/services/orden.service';
import { Orden } from 'src/app/models/Orden';

@Component({
  selector: 'app-adddetalles',
  templateUrl: './adddetalles.component.html',
  styleUrls: ['./adddetalles.component.scss']
})
export class AddDetallesComponent {
  datos: FormGroup;
  detalle: Detalle = new Detalle();
  orden: Orden = new Orden();
  productos: Producto[];
  producto: Producto;
  time = { hour: 10, minute: 10 };
  constructor(private serviceProducto: ProductoService, private serviceOrden: OrdenService,
    private serviceDetalle: DetalleService, private router: Router, private builder: FormBuilder, private toastr: ToastrService) {
    this.serviceProducto.getProductos()
      .subscribe(data => {
        this.productos = data;
      })
    this.serviceOrden.getOrdenId(+localStorage.getItem("idorden"))
      .subscribe(data => {
        this.orden = data;
      })
    this.createBuilder();
  }

  createBuilder() {
    this.datos = this.builder.group({
      producto: ['', Validators.required],
      cantidad: ['0', Validators.required],
      disponibilidad: ['0', {}],
      precio: ['Q.0', {}]
    });
  }

  UpdateValue(event: Event) {
    this.producto = this.productos.find(u => u.idproducto == this.datos.value.producto);
    this.datos.patchValue({
      disponibilidad: this.producto.cantidad,
      precio: 'Q.' + this.producto.precio
    })
  }

  Guardar(event: Event) {
    let flag = true;
    console.log(this.datos.valid);
    this.producto = this.productos.find(u => u.idproducto == this.datos.value.producto)
    if (this.datos.value.producto === '') {
      this.toastr.error("Debe seleccionar un producto!", "Error", {
        timeOut: 3000
      })
    } else {
      if (this.datos.value.cantidad > this.producto.cantidad) {
        flag = false;
        this.toastr.error("No hay suficientes productos!", "Error", {
          timeOut: 3000
        })
      }
    }
    console.log(this.datos.value);
    if (this.datos.valid && flag) {
      this.detalle.idorden = this.orden;
      this.detalle.cantidad = this.datos.value.cantidad;
      this.producto.cantidad = this.producto.cantidad - this.detalle.cantidad;
      this.detalle.idproducto = this.producto;
      console.log(this.detalle);
      this.serviceDetalle.createDetalle(this.detalle)
        .subscribe(data => {
          this.toastr.success("Se ha guardado el registro!", "Exitoso", {
            timeOut: 3000
          })
          this.orden.total = this.orden.total + (this.detalle.cantidad * this.detalle.idproducto.precio);
          this.serviceOrden.updateOrden(this.orden)
            .subscribe(data => {
              console.log("actualizando orden: ", data);
              this.serviceProducto.updateProducto(this.producto)
                .subscribe(data => {
                  console.log("actualizando producto: ", data);
                  this.router.navigate(["detalles"])
                })
            })

        })
    }

  }

  Cancelar() {
    this.router.navigate(["detalles"]);
  }

}
