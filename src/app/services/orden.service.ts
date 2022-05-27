import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Orden } from '../models/orden'

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http:HttpClient){}
  url='http://localhost:1110/orden/';

  getOrdenes(){
    return this.http.get<Orden[]>(this.url+"listar");
  }
  createOrden(orden:Orden){
    return this.http.post<Orden>(this.url,orden);
  }

  async getOrdenId(id:number){
    return this.http.get<Orden>(this.url+id)
  }

  updateOrden(orden:Orden){
    return this.http.put<Orden>(this.url+orden.idorden,orden);
  }

  deleteOrden(orden:Orden){
    return this.http.delete<Orden>(this.url+orden.idorden);
  }
}
