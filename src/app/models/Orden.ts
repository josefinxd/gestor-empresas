import { Usuario } from "./Usuario";

export class Orden{
  idorden:number;
  fecha:Date;
  tipo:String;
  idcomprador:Usuario = new Usuario();
  idvendedor:Usuario = new Usuario();
  total:number;
}
