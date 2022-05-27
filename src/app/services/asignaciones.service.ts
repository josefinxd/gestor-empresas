import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Asignacion } from '../models/asignacion'

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(private http:HttpClient){}
  url='http://localhost:1110/asignacion/';

  getAsignaciones(){
    return this.http.get<Asignacion[]>(this.url+"listar");
  }
  createAsignacion(asignacion:Asignacion){
    return this.http.post<Asignacion>(this.url,asignacion);
  }

  async getAsignacionId(id:number){
    return this.http.get<Asignacion>(this.url+id)
  }

  updateAsignacion(asignacion:Asignacion){
    return this.http.put<Asignacion>(this.url+asignacion.idasignacion,asignacion);
  }

  deleteAsignacion(asignacion:Asignacion){
    return this.http.delete<Asignacion>(this.url+asignacion.idasignacion);
  }
}
