import { Empresa } from "./empresa";

export class Producto{
  idproducto:number;
  nombre:String;
  cantidad:number;
  precio:number;
  idempresa:Empresa = new Empresa();
}
