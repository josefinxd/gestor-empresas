import { Empresa } from "./Empresa";
import { Usuario } from "./Usuario";
export class Asignacion{
  idasignacion:number;
  rol:String;
  idempresa:Empresa = new Empresa();
  idusuario:Usuario = new Usuario();
}
