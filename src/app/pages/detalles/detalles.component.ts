import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Detalle } from 'src/app/models/Detalle';
import { DetalleService } from '../../services/detalle.service'
import { NgxSpinnerService } from "ngx-spinner";
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { OrdenService } from 'src/app/services/orden.service';
import { Orden } from 'src/app/models/Orden';
import { formatDate, formatNumber } from '@angular/common';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
  providers: [ConfirmationService]
})
export class DetallesComponent implements OnInit {

  detalles: Detalle[];
  isLoading = false;
  orden: Orden = new Orden();
  datos: FormGroup;
  producto: Producto = new Producto();
  constructor(private service: DetalleService, private serviceOrden: OrdenService, private router: Router,
    private serviceUsuario: UsuarioService, private toastr: ToastrService, private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService, private builder: FormBuilder, private serviceProducto: ProductoService,
    private primengConfig: PrimeNGConfig) {
    this.createBuilder();
  }

  createBuilder() {
    console.log("createBuilder");
    this.datos = this.builder.group({
      id: ['', []],
      fecha: ['', []],
      tipo: ['', []],
      comprador: ['', []],
      vendedor: ['', []],
      total: ['0', []]
    });
  }

  loadInfo() {
    this.serviceOrden.getOrdenId(+localStorage.getItem("idorden"))
      .subscribe(data => {
        this.orden = data;
        this.datos.patchValue({
          id: this.orden.idorden,
          fecha: formatDate(this.orden.fecha, 'yyyy-MM-dd hh:mm aa', 'en-US'),
          tipo: this.orden.tipo,
          vendedor: this.orden.idvendedor.usuario,
          comprador: this.orden.idcomprador.usuario,
          total: 'Q.' + formatNumber(this.orden.total, 'en-US')
        })
        console.log('orden', this.datos);
        this.service.getDetallesByOrden(this.orden)
          .subscribe(data => {
            this.detalles = data;
            this.spinner.hide();
            this.primengConfig.ripple = true;
            console.log(this.detalles);
          })
      })
  }

  ngOnInit() {
    this.spinner.show();
    this.loadInfo();
  }

  Nuevo() {
    localStorage.setItem("idorden", this.orden.idorden.toString());
    this.router.navigate(["adddetalle"]);
  }

  Editar(detalle: Detalle): void {
    localStorage.setItem("iddetalle", detalle.iddetalle.toString());
    this.router.navigate(["editdetalle"]);
  }

  Regresar() {
    this.router.navigate(["ordenes"]);
  }

  Eliminar(detalle: Detalle) {
    console.log("Entro a eliminar");
    this.producto = detalle.idproducto;
    this.confirmationService.confirm({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accept")
        this.service.deleteDetalle(detalle)
          .subscribe(data => {
            this.detalles = this.detalles.filter(e => e !== detalle);
            this.toastr.success("Se ha eliminado el registro!", "Exitoso", {
              timeOut: 3000
            })
            this.orden.total = this.orden.total - (detalle.cantidad * detalle.idproducto.precio);
            this.serviceOrden.updateOrden(this.orden)
              .subscribe(data => {
                console.log("actualizando orden: ", data);
                this.producto.cantidad = this.producto.cantidad + detalle.cantidad;
                console.log("actual producto:", this.producto);
                this.serviceProducto.updateProducto(this.producto)
                  .subscribe(data => {
                    console.log("actualizando producto: ", data);
                    this.loadInfo();
                    this.router.navigate(["detalles"]);
                  })
              })
          });

      },
      reject: () => {
        this.toastr.warning("Cancelo la acción", "Advertencia", {
          timeOut: 3000
        })
      }
    });
  }

}
