import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Asignacion } from '../models/Asignacion'

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(private http:HttpClient){}
  url='https://backendgestorproyectos02-env.eba-k3pf5xkd.us-east-1.elasticbeanstalk.com/asignacion/';

  getAsignaciones(){
    return this.http.get<Asignacion[]>(this.url+"listar");
  }
  createAsignacion(asignacion:Asignacion){
    return this.http.post<Asignacion>(this.url,asignacion);
  }

  getAsignacionId(id:number){
    return this.http.get<Asignacion>(this.url+id)
  }

  updateAsignacion(asignacion:Asignacion){
    return this.http.put<Asignacion>(this.url+asignacion.idasignacion,asignacion);
  }

  deleteAsignacion(asignacion:Asignacion){
    return this.http.delete<Asignacion>(this.url+asignacion.idasignacion);
  }
}
