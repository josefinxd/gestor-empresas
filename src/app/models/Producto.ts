import { Empresa } from "./Empresa";

export class Producto{
  idproducto:number;
  nombre:String;
  cantidad:number;
  precio:number;
  idempresa:Empresa = new Empresa();
}
