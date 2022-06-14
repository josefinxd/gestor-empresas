import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Detalle } from '../models/Detalle'
import { Orden } from "../models/Orden";

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(private http:HttpClient){}
  url='http://backendgestorproyectos01-env.eba-spf4u5uu.us-east-1.elasticbeanstalk.com/detalle/';

  getDetalles(){
    return this.http.get<Detalle[]>(this.url+"listar");
  }

  createDetalle(detalle:Detalle){
    return this.http.post<Detalle>(this.url,detalle);
  }

  getDetalleId(id:number){
    return this.http.get<Detalle>(this.url+id)
  }

  updateDetalle(detalle:Detalle){
    return this.http.put<Detalle>(this.url+detalle.iddetalle,detalle);
  }

  deleteDetalle(detalle:Detalle){
    return this.http.delete<Detalle>(this.url+detalle.iddetalle);
  }

  getDetallesByOrden(orden:Orden){
    return this.http.post<Detalle[]>(this.url+"listarByOrden",orden);
  }
}
