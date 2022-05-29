import { Usuario } from "./usuario";

export class Reunion{
  idreunion:number;
  fecha:Date;
  idusuario:Usuario = new Usuario();
  idcliente:Usuario = new Usuario();
}
