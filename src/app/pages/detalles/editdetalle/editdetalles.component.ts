import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../../services/empresa.service'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Detalle } from 'src/app/models/Detalle';
import { Usuario } from 'src/app/models/usuario';
import { DetalleService } from 'src/app/services/detalle.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-editdetalles',
  templateUrl: './editdetalles.component.html',
  styleUrls: ['./editdetalles.component.scss']
})

export class EditDetallesComponent implements OnInit {
  datos: FormGroup;
  detalle: Detalle = new Detalle();
  usuarios: Usuario[];
  constructor(private serviceEmpresa: EmpresaService, private serviceUsuario: UsuarioService,
    private serviceDetalle: DetalleService, private router: Router, private builder: FormBuilder,
    private toastr: ToastrService) {
    this.createBuilder();
  }

  loadInfo() {
    this.serviceDetalle.getDetalleId(+localStorage.getItem("iddetalle"))
      .subscribe(data => {
        this.detalle = data;
        /*this.datos.patchValue({
          fecha: formatDate(this.detalle.fecha, 'yyyy-MM-dd hh:mm aa', 'en-US'),
          tipo: this.detalle.tipo,
          usuario: this.detalle.idvendedor.idusuario,
          cliente: this.detalle.idcomprador.idusuario
        })*/
        console.log('detalle', this.detalle)
      })
    this.serviceUsuario.getUsuarios()
      .subscribe(data => {
        this.usuarios = data;
      })
  }

  createBuilder() {
    console.log("createBuilder");
    this.datos = this.builder.group({
      fecha: ['', Validators.required],
      tipo: ['Interna', Validators.required],
			usuario: ['', Validators.required],
      cliente: ['', Validators.required]
    });
    console.log(this.datos.value)
  }

  ngOnInit() {
    this.loadInfo();
  }

  Cancelar() {
    this.router.navigate(["detalles"]);
  }


  Guardar(event: Event) {
    console.log(this.datos.value)
    console.log(this.datos.valid);
    if (this.datos.value.usuario === '') {
      this.toastr.error("Debe seleccionar un usuario!", "Error", {
        timeOut: 3000
      })
    }
    if (this.datos.value.empresa === '') {
      this.toastr.error("Debe seleccionar una empresa!", "Error", {
        timeOut: 3000
      })
    }
    console.log(this.datos.value);
    if (this.datos.valid) {
      //this.detalle.idcomprador = this.usuarios.find(u => u.idusuario == this.datos.value.usuario);
      console.log(this.detalle);
      this.serviceDetalle.createDetalle(this.detalle)
        .subscribe(data => {
          this.toastr.success("Se ha actualizado el registro!", "Exitoso", {
            timeOut: 3000
          })
          this.router.navigate(["detalles"])
        })
    }
  }

}
