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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'empresas',       component: EmpresasComponent },
    { path: 'addempresa',     component:AddEmpresasComponent },
    { path: 'editempresa',    component:EditEmpresasComponent },
    { path: 'usuarios',       component: UsuariosComponent },
    { path: 'addusuario',     component:AddUsuariosComponent },
    { path: 'editusuario',    component:EditUsuariosComponent },
];
