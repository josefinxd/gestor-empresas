import { Usuario } from "./usuario";

export class Orden{
  idorden:number;
  fecha:Date;
  tipo:String;
  idcomprador:Usuario = new Usuario();
  idvendedor:Usuario = new Usuario();
}
