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
    { path: '/tables', title: 'Usuarios',  icon:'ni-circle-08 text-blue', class: '' },
    { path: '/empresas', title: 'Empresas',  icon:'ni-building text-grey', class: '' },
    { path: '/tables', title: 'Asignaciones',  icon:'ni-bullet-list-67 text-brown', class: '' },
    { path: '/tables', title: 'Pedidos Internos',  icon:'ni-book-bookmark text-orange', class: '' },
    { path: '/tables', title: 'Reuniones',  icon:'ni-calendar-grid-58 text-green', class: '' },
    { path: '/tables', title: 'Compras',  icon:'ni-cart text-black', class: '' },
    { path: '/tables', title: 'Ventas',  icon:'ni-shop text-blue', class: '' },
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
