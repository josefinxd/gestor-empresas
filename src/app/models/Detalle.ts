import { Orden } from "./Orden";
import { Producto } from "./producto";

export class Detalle{
  iddetalle:number;
  cantidad:number;
  idorden:Orden = new Orden();
  idproducto:Producto = new Producto();
}
