import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Detalle } from '../models/detalle'

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(private http:HttpClient){}
  url='http://localhost:1110/detalle/';

  getDetalles(){
    return this.http.get<Detalle[]>(this.url+"listar");
  }
  createDetalle(detalle:Detalle){
    return this.http.post<Detalle>(this.url,detalle);
  }

  async getDetalleId(id:number){
    return this.http.get<Detalle>(this.url+id)
  }

  updateDetalle(detalle:Detalle){
    return this.http.put<Detalle>(this.url+detalle.iddetalle,detalle);
  }

  deleteDetalle(detalle:Detalle){
    return this.http.delete<Detalle>(this.url+detalle.iddetalle);
  }
}
