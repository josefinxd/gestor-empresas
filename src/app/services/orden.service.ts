import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Orden } from '../models/Orden'

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http:HttpClient){}
  url='https://backendgestorproyectos02-env.eba-k3pf5xkd.us-east-1.elasticbeanstalk.com/orden/';

  getOrdenes(){
    return this.http.get<Orden[]>(this.url+"listar");
  }
  createOrden(orden:Orden){
    return this.http.post<Orden>(this.url,orden);
  }

  getOrdenId(id:number){
    return this.http.get<Orden>(this.url+id)
  }

  updateOrden(orden:Orden){
    return this.http.put<Orden>(this.url+orden.idorden,orden);
  }

  deleteOrden(orden:Orden){
    return this.http.delete<Orden>(this.url+orden.idorden);
  }
}
