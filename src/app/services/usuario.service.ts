import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../models/Usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient){}
  url='https://backendgestorproyectos02-env.eba-k3pf5xkd.us-east-1.elasticbeanstalk.com/usuario/';
  loginurl = 'https://backendgestorproyectos02-env.eba-k3pf5xkd.us-east-1.elasticbeanstalk.com/login';

  getUsuarios(){
    return this.http.get<Usuario[]>(this.url+"listar");
  }
  createUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.url,usuario);
  }

  getUsuarioId(id:number){
    return this.http.get<Usuario>(this.url+id)
  }

  updateUsuario(usuario:Usuario){
    return this.http.put<Usuario>(this.url+usuario.idusuario,usuario);
  }

  deleteUsuario(usuario:Usuario){
    return this.http.delete<Usuario>(this.url+usuario.idusuario);
  }

  loginUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.loginurl,usuario);
  }
}
