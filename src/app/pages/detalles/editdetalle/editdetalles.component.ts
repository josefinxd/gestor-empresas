import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Detalle } from 'src/app/models/Detalle';
import { DetalleService } from 'src/app/services/detalle.service';
import { Orden } from 'src/app/models/Orden';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { OrdenService } from 'src/app/services/orden.service';
@Component({
  selector: 'app-editdetalles',
  templateUrl: './editdetalles.component.html',
  styleUrls: ['./editdetalles.component.scss']
})

export class EditDetallesComponent implements OnInit {
  datos: FormGroup;
  detalle: Detalle = new Detalle();
  auxDetalle: Detalle = new Detalle();
  orden: Orden = new Orden();
  productos: Producto[];
  producto: Producto;
  auxProducto: Producto;
  constructor(private serviceProducto: ProductoService, private serviceOrden: OrdenService,
    private serviceDetalle: DetalleService, private router: Router, private builder: FormBuilder,
    private toastr: ToastrService) {
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

  loadInfo() {
    this.serviceDetalle.getDetalleId(+localStorage.getItem("iddetalle"))
      .subscribe(data => {
        this.detalle = data;
        this.auxDetalle.idproducto=this.detalle.idproducto;
        this.auxDetalle.cantidad=this.detalle.cantidad;
        //(Asignar producto por partes y arreglar el editado)
        this.auxProducto = this.detalle.idproducto;
        this.datos.patchValue({
          producto: this.detalle.idproducto.idproducto,
          cantidad: this.detalle.cantidad,
          disponibilidad: this.detalle.idproducto.cantidad,
          precio: 'Q.' + this.detalle.idproducto.precio
        })
        console.log('detalle', this.detalle)
      })
  }

  createBuilder() {
    this.datos = this.builder.group({
      producto: ['', Validators.required],
      cantidad: ['0', Validators.required],
      disponibilidad: ['0', {}],
      precio: ['Q.0', {}]
    });
  }

  ngOnInit() {
    this.loadInfo();
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
      console.log('detalle anteriorpre', this.auxDetalle.cantidad)
      this.detalle.cantidad = this.datos.value.cantidad;
      console.log('orden anterior', this.orden.total)
      console.log('producto anterior', this.auxProducto.cantidad)
      console.log('detalle anterior', this.auxDetalle.cantidad)
      console.log('detalle anteriorn', this.detalle.cantidad)
      console.log('producto actualpre',this.producto.cantidad)
      console.log('producto anterior', this.auxProducto)
      this.orden.total = this.orden.total - (this.auxDetalle.cantidad * this.auxDetalle.idproducto.precio);
      if (this.producto.idproducto == this.auxProducto.idproducto) {
        this.producto.cantidad = this.producto.cantidad + this.auxDetalle.cantidad;
        console.log('producto if',this.producto.cantidad)
      }/*else{
        this.producto.cantidad = this.producto.cantidad + this.auxDetalle.cantidad;
      }*/
      this.auxProducto.cantidad = this.auxProducto.cantidad + this.auxDetalle.cantidad;
      console.log('producto anterior u', this.auxProducto.cantidad)
      console.log('orden actual', this.orden.total)
      console.log('producto actual',this.producto.cantidad)
      console.log('producto actual',this.producto)
      this.producto.cantidad = this.producto.cantidad - this.detalle.cantidad;
      console.log('producto final',this.producto.cantidad)
      this.detalle.idproducto = new Producto();
      this.detalle.idproducto = this.producto;
      console.log(this.detalle);
      console.log('producto que lleva', this.detalle.idproducto)
      this.serviceDetalle.updateDetalle(this.detalle)
        .subscribe(data => {
          this.toastr.success("Se ha guardado el registro!", "Exitoso", {
            timeOut: 3000
          })
          console.log('detalle actualizado', data)
          this.orden.total = this.orden.total + (this.detalle.cantidad * this.detalle.idproducto.precio);
          this.serviceOrden.updateOrden(this.orden)
            .subscribe(data => {
              console.log("actualizando orden: ", data);
              this.serviceProducto.updateProducto(this.producto)
                .subscribe(data => {
                  console.log("actualizando producto: ", data);
                  if (this.detalle.idproducto.idproducto != this.auxDetalle.idproducto.idproducto) {
                    console.log('cambio de producto')
                    console.log(this.auxProducto)
                    this.serviceProducto.updateProducto(this.auxProducto)
                      .subscribe(data => {
                        console.log("actualizando producto anterior: ", data);
                      })
                  }
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
