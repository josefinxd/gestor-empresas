import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Producto } from '../models/Producto'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient){}
  url='http://backendgestorproyectos01-env.eba-spf4u5uu.us-east-1.elasticbeanstalk.com/producto/';

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
