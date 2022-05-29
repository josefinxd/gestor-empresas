import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/user-profile', title: 'Perfil de Usuario',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/usuarios', title: 'Usuarios',  icon:'ni-circle-08 text-blue', class: '' },
    { path: '/empresas', title: 'Empresas',  icon:'ni-building text-grey', class: '' },
    { path: '/asignaciones', title: 'Asignaciones',  icon:'ni-bullet-list-67 text-brown', class: '' },
    { path: '/productos', title: 'Productos',  icon:'ni-box-2 text-purple', class: '' },
    { path: '/reuniones', title: 'Reuniones',  icon:'ni-calendar-grid-58 text-green', class: '' },
    { path: '/tables', title: 'Ordenes',  icon:'ni-cart text-black', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
