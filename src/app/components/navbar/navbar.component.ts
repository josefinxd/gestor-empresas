import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/Usuario';
import { Session } from 'src/app/models/Sesion';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  sesion: Session
  user:Usuario;

  constructor(location: Location,  private element: ElementRef, private router: Router,
    private storageService:StorageService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.sesion = JSON.parse(localStorage.getItem('currentUser'));
    console.log('navbar', this.sesion)
    this.user = this.sesion.user;
    console.log('navbar', this.user)
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  logout(){
    console.log('logout')
    this.storageService.logout();
  }

}
