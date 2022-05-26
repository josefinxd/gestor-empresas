import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../models/usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient){}
  url='http://localhost:1110/usuario/';

  getUsuarios(){
    return this.http.get<Usuario[]>(this.url+"listar");
  }
  createUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.url,usuario);
  }

  async getUsuarioId(id:number){
    return this.http.get<Usuario>(this.url+id)
  }

  updateUsuario(usuario:Usuario){
    return this.http.put<Usuario>(this.url+usuario.idusuario,usuario);
  }

  deleteUsuario(usuario:Usuario){
    return this.http.delete<Usuario>(this.url+usuario.idusuario);
  }
}
