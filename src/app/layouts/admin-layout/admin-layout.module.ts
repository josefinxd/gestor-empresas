import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { EmpresasComponent } from '../../pages/empresas/empresas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmpresasComponent } from 'src/app/pages/empresas/addempresa/addempresas.component';
import { EditEmpresasComponent } from 'src/app/pages/empresas/editempresa/editempresas.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UsuariosComponent } from 'src/app/pages/usuarios/usuarios.component';
import { AddUsuariosComponent } from 'src/app/pages/usuarios/addusuario/addusuarios.component';
import { EditUsuariosComponent } from 'src/app/pages/usuarios/editusuario/editusuarios.component';
import { AsignacionesComponent } from 'src/app/pages/asignaciones/asignaciones.component';
import { AddAsignacionesComponent } from 'src/app/pages/asignaciones/addasignacion/addasignaciones.component';
import { EditAsignacionesComponent } from 'src/app/pages/asignaciones/editasignacion/editasignaciones.component';
import { ProductosComponent } from 'src/app/pages/productos/productos.component';
import { AddProductosComponent } from 'src/app/pages/productos/addusuario/addproductos.component';
import { EditProductosComponent } from 'src/app/pages/productos/editusuario/editproductos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    EmpresasComponent,
    AddEmpresasComponent,
    EditEmpresasComponent,
    UsuariosComponent,
    AddUsuariosComponent,
    EditUsuariosComponent,
    AsignacionesComponent,
    AddAsignacionesComponent,
    EditAsignacionesComponent,
    ProductosComponent,
    AddProductosComponent,
    EditProductosComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class AdminLayoutModule {}
