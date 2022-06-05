import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { EmpresasComponent } from '../../pages/empresas/empresas.component';
import { AddEmpresasComponent } from 'src/app/pages/empresas/addempresa/addempresas.component';
import { EditEmpresasComponent } from 'src/app/pages/empresas/editempresa/editempresas.component';
import { UsuariosComponent } from 'src/app/pages/usuarios/usuarios.component';
import { AddUsuariosComponent } from 'src/app/pages/usuarios/addusuario/addusuarios.component';
import { EditUsuariosComponent } from 'src/app/pages/usuarios/editusuario/editusuarios.component';
import { AsignacionesComponent } from 'src/app/pages/asignaciones/asignaciones.component';
import { AddAsignacionesComponent } from 'src/app/pages/asignaciones/addasignacion/addasignaciones.component';
import { EditAsignacionesComponent } from 'src/app/pages/asignaciones/editasignacion/editasignaciones.component';
import { ProductosComponent } from 'src/app/pages/productos/productos.component';
import { AddProductosComponent } from 'src/app/pages/productos/addproducto/addproductos.component';
import { EditProductosComponent } from 'src/app/pages/productos/editproducto/editproductos.component';
import { ReunionesComponent } from 'src/app/pages/reuniones/reuniones.component';
import { AddReunionesComponent } from 'src/app/pages/reuniones/addreunion/addreuniones.component';
import { EditReunionesComponent } from 'src/app/pages/reuniones/editreunion/editreuniones.component';
import { OrdenesComponent } from 'src/app/pages/ordenes/ordenes.component';
import { AddOrdenesComponent } from 'src/app/pages/ordenes/addorden/addordenes.component';
import { EditOrdenesComponent } from 'src/app/pages/ordenes/editorden/editordenes.component';
import { DetallesComponent } from 'src/app/pages/detalles/detalles.component';
import { AddDetallesComponent } from 'src/app/pages/detalles/adddetalle/adddetalles.component';
import { EditDetallesComponent } from 'src/app/pages/detalles/editdetalle/editdetalles.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'empresas',       component: EmpresasComponent },
    { path: 'addempresa',     component: AddEmpresasComponent },
    { path: 'editempresa',    component: EditEmpresasComponent },
    { path: 'usuarios',       component: UsuariosComponent },
    { path: 'addusuario',     component: AddUsuariosComponent },
    { path: 'editusuario',    component: EditUsuariosComponent },
    { path: 'asignaciones',   component: AsignacionesComponent },
    { path: 'addasignacion',  component: AddAsignacionesComponent },
    { path: 'editasignacion', component: EditAsignacionesComponent },
    { path: 'productos',      component: ProductosComponent },
    { path: 'addproducto',    component: AddProductosComponent },
    { path: 'editproducto',   component: EditProductosComponent },
    { path: 'reuniones',      component: ReunionesComponent },
    { path: 'addreunion',     component: AddReunionesComponent },
    { path: 'editreunion',    component: EditReunionesComponent },
    { path: 'ordenes',        component: OrdenesComponent },
    { path: 'addorden',       component: AddOrdenesComponent },
    { path: 'editorden',      component: EditOrdenesComponent },
    { path: 'detalles',       component: DetallesComponent },
    { path: 'adddetalle',     component: AddDetallesComponent },
    { path: 'editdetalle',    component: EditDetallesComponent },
];
