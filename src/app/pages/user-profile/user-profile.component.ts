import { Component, OnInit } from '@angular/core';
import { Asignacion } from 'src/app/models/Asignacion';
import { Session } from 'src/app/models/Sesion';
import { Usuario } from 'src/app/models/Usuario';
import { AsignacionService } from 'src/app/services/asignaciones.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user:Usuario;
  sesion: Session;
  asignaciones: Asignacion[];
  asignacion: Asignacion;

  constructor(private serviceAsignacion: AsignacionService) {
   }

  ngOnInit() {
    this.sesion = JSON.parse(localStorage.getItem('currentUser'));
    this.user = this.sesion.user;
    this.serviceAsignacion.getAsignaciones()
      .subscribe(data => {
        this.asignaciones = data;
        this.asignacion = this.asignaciones.find(a => a.idusuario.idusuario = this.user.idusuario);
        console.log(this.asignaciones);
      });
  }

}
