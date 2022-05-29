import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Producto } from '../models/producto'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient){}
  url='http://localhost:1110/producto/';

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
    return this.http.put<Producto>(this.url+producto.idproducto,producto);
  }

  deleteProducto(producto:Producto){
    return this.http.delete<Producto>(this.url+producto.idproducto);
  }
}
