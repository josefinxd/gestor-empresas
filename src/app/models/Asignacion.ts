import { Empresa } from "./empresa";
import { Usuario } from "./usuario";

export class Asignacion{
  idasignacion:number;
  rol:String;
  idempresa:Empresa = new Empresa();
  idusuario:Usuario = new Usuario();
}
