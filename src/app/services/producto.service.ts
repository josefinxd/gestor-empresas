import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Producto } from '../models/Producto'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient){}
  url='https://backendgestorproyectos02-env.eba-k3pf5xkd.us-east-1.elasticbeanstalk.com/producto/';

  getProductos(){
    return this.http.get<Producto[]>(this.url+"listar");
  }
  createProducto(producto:Producto){
    return this.http.post<Producto>(this.url,producto);
  }

  getProductoId(id:number){
    return this.http.get<Producto>(this.url+id)
  }

  updateProducto(producto:Producto){
    console.log("updateProducto:", producto)
    return this.http.put<Producto>(this.url+producto.idproducto,producto);
  }

  deleteProducto(producto:Producto){
    return this.http.delete<Producto>(this.url+producto.idproducto);
  }
}
